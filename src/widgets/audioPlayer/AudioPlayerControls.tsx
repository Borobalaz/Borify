import { Slider } from "@mui/material";
import "./AudioPlayerControls.css";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { PlaybackControls } from "../playerBar/PlaybackControls";
import { VolumeControl } from "../playerBar/VolumeControl";

export function AudioPlayerControls() {
  return (
    <div className="audio-player-controls">
      <div className="audio-player-time-display">

      </div>
      <div className="audio-player-controls-buttons">
        <PlaybackControls />
      </div>
      <div className="audio-player-volume-control">
        <VolumeDownIcon />
        <VolumeControl />
        <VolumeUpIcon />
      </div>
    </div>
  );
}