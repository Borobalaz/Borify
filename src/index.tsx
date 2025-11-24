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
import { offTracksUpdated, onTracksUpdated } from "./backend/database/databaseEvents";
import { LoadingScreen } from "./screens/LoadingScreen";

export function App() {
  let [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  let [isDarkTheme, setIsDarkTheme] = useState(true);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDB();
        console.log("IndexedDB initialized");

        setIsDarkTheme(localStorage.getItem("theme") == "dark");

        onTracksUpdated(setupAutoUpdateAllTracksCollection);

        // Load default data if first run
        if (localStorage.getItem("first-run") == "true" || !localStorage.getItem("first-run")) {
          await loadDefaultData();
          localStorage.setItem("first-run", "false");
        }
      } catch (err) {
        console.error("Failed to initialize app", err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();

    return () => {
      offTracksUpdated(setupAutoUpdateAllTracksCollection);
    };
  }, []);

  useEffect(() => {
    let theme = isDarkTheme ? "dark" : "light";
    localStorage.setItem("theme", theme);
  }, [isDarkTheme]);

  if (loading) {
    return (
      <div className={isDarkTheme ? "theme-dark" : "theme-light"}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className={isDarkTheme ? "theme-dark" : "theme-light"}>
      <div id="popup-root" />
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
