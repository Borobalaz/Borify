import { IconButton } from "@mui/material";
import "./TrackCard.css";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface TrackCardProps {
  onPlay: () => void;
}

export function TrackCard({ onPlay }: TrackCardProps) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="track-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0} // make div focusable for keyboard users
    >

      {isHovered ?
        <PlayArrowIcon className="track-card-play-icon" onClick={onPlay} />
        :
        <div className="track-card-id">1</div>
      }
      <div className="track-card-info">
        <div className="track-card-title"> Track Title </div>
        <div className="track-card-artist"> Artist Name </div>
      </div>
      <IconButton className="track-card-remove-button" color="inherit">
        <RemoveCircleOutlineIcon />
      </IconButton>
      <div className="track-card-duration"> 3:45 </div>
    </div>
  );
}