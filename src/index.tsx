import { motion, AnimatePresence } from "framer-motion";
import { AudioPlayerScreen } from "./screens/AudioPlayerScreen";
import { MainScreen } from "./screens/MainScreen";
import { useState } from "preact/hooks";
import { render } from "preact";
import "./style.css"

export function App() {
	let [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
	let [isDarkTheme, setIsDarkTheme] = useState(true);

	return (
		<div className={isDarkTheme ? "theme-dark" : "theme-light"}>
			<MainScreen 
				onPlayTrack={() => setIsAudioPlayerOpen(true)} 
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
						}}
					>
						{/* Cast custom component to any to satisfy TypeScript */}
						{(AudioPlayerScreen as any)({ onReturn: () => setIsAudioPlayerOpen(false) })}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

render(<App />, document.getElementById('app'));