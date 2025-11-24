import { motion, AnimatePresence } from "framer-motion";
import { AudioPlayerScreen } from "./screens/AudioPlayerScreen";
import { MainScreen } from "./screens/MainScreen";
import { useEffect, useState } from "preact/hooks";
import { render } from "preact";
import "./style.css"
import { initDB } from "./backend/database/initDatabase";
import { setupAutoUpdateAllTracksCollection } from "./backend/services/AutoUpdateAllTracksCollection";
import { PopupProvider } from "./utility/PopupProvider";
import { loadDefaultData } from "./backend/database/defaultValues";

export function App() {
  let [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  let [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {

    const initDatabase = async () => {
      await initDB().then(() => {
        console.log("IndexedDB initialized");
      }).catch(err => {
        console.error("Failed to initialize IndexedDB", err);
      });
    };

    // DATABASE
    initDatabase();
		setIsDarkTheme(localStorage.getItem("theme") == "dark");
    // SERVICES
    setupAutoUpdateAllTracksCollection();
    if(localStorage.getItem("first-run") == "true" || !localStorage.getItem("first-run")){
      loadDefaultData();
      localStorage.setItem("first-run", "false");
    }
  }, []);

	useEffect(() => {
		let theme = isDarkTheme ? "dark": "light";
		localStorage.setItem("theme", theme);
	}, [isDarkTheme]);

  return (
    <div className={isDarkTheme ? "theme-dark" : "theme-light"}>
      <div id="popup-root"/>
      <MainScreen
        onOpenPlayer={() => setIsAudioPlayerOpen(true)}
        onThemeChange={() => setIsDarkTheme(!isDarkTheme)} />

      <AnimatePresence>
        {isAudioPlayerOpen && (
          <motion.div
            key="audio"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {(AudioPlayerScreen as any)({ onReturn: () => setIsAudioPlayerOpen(false) })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

render(
  <PopupProvider>
    <App />
  </PopupProvider>,
  document.getElementById("app")
);
