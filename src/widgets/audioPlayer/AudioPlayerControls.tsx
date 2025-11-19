import { Slider } from "@mui/material";
import "./AudioPlayerControls.css";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export function AudioPlayerControls() {
  return (
    <div className="audio-player-controls">
      <div className="audio-player-time-display">

      </div>
      <div className="audio-player-controls-buttons">

      </div>
      <div className="audio-player-volume-control">
        <VolumeDownIcon />
        <Slider 
          className="audio-player-slider" 
          defaultValue={30} />
        <VolumeUpIcon />
      </div>
    </div>
  );
}