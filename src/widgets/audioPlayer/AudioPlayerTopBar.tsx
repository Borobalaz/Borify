import { IconButton } from "@mui/material";
import "./AudioPlayerTopBar.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
        <ArrowDownwardIcon />
      </IconButton>
      <div className="audio-player-top-bar-title"> Now Playing </div>
    </div>
  );
}