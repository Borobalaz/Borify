import { AudioPlayerControls } from "../widgets/audioPlayer/AudioPlayerControls";
import { AudioPlayerTopBar } from "../widgets/audioPlayer/AudioPlayerTopBar";
import "./AudioPlayerScreen.css";

interface AudioPlayerScreenProps {
  onReturn?: () => void;
}


export function AudioPlayerScreen({ onReturn }: AudioPlayerScreenProps) {

  return (
    <div className="audio-player-screen" >
      <AudioPlayerTopBar onReturn={onReturn} />
      <img className="audio-player-image" src="./collection_placeholder.jpg"></img>
      <div className="audio-player-info">
        <p className="audio-player-title"> Mantova </p>
        <p className="audio-player-artist"> Hakumba </p>
      </div>
      <AudioPlayerControls />
    </div>
  );
}