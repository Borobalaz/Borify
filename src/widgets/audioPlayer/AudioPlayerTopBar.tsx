import { IconButton } from "@mui/material";
import "./AudioPlayerTopBar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AudioPlayerTopBarProps {
  onReturn: () => void;
}

export function AudioPlayerTopBar({ onReturn }: AudioPlayerTopBarProps) {
  return (
    <div className="audio-player-top-bar">
      <IconButton 
        className="audio-player-top-bar-return-button" 
        color="inherit"
        onClick={onReturn}>
        <ArrowBackIcon />
      </IconButton>
      <div className="audio-player-top-bar-title"> Now Playing </div>
    </div>
  );
}