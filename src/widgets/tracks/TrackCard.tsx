import { IconButton } from "@mui/material";
import "./TrackCard.css";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { deleteTrack, getTrack } from "../../backend/database/tracksCRUD";
import { TrackDTO } from "../../backend/database/DTOs";
import { useEffect } from "react";
import { initDB } from "../../backend/database/initDatabase";
import { audioController } from "../../backend/audio-player/AudioController";

interface TrackCardProps {
  onPlay?: () => void;
  trackID: string;
  place: number;
}

export function TrackCard({ onPlay, trackID, place }: TrackCardProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [trackObj, setTrackObj] = useState<TrackDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrackFromDatabase = async () => {
      await initDB();
      setTrackObj(await getTrack(trackID));
      setLoading(false);
    };
    getTrackFromDatabase();
  }, [])

  if (loading) {
    return <p className="track-card-loading-text"> Loading... </p>
  }

  return (
    <div
      className="track-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      {isHovered ?
        <PlayArrowIcon className="track-card-play-icon" 
          onClick={() => {
            (onPlay && onPlay());
            audioController.play(trackObj);
          }} />
        :
        <div className="track-card-id">{place}</div>
      }
      <div className="track-card-info">
        <div className="track-card-title">{trackObj.title}</div>
        <div className="track-card-artist">{trackObj.artist}</div>
      </div>
      <IconButton
        className="track-card-remove-button"
        color="inherit"
        onClick={() => {
          deleteTrack(trackObj.track_id);
        }}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      <div className="track-card-duration">{trackObj.duration}</div>
    </div>
  );
}