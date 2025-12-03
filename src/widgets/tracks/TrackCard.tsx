import { IconButton } from "@mui/material";
import "./TrackCard.css";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { deleteTrack, getTrack } from "../../backend/database/tracksCRUD";
import { TrackDTO } from "../../backend/database/DTOs";
import { useEffect } from "react";
import { audioController } from "../../backend/audio-player/AudioController";
import { TrackManagerPopup } from "./TrackManagerPopup";
import { usePopup } from "../../utility/PopupContext";
import { useRef } from "react";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface TrackCardProps {
  onPlay?: () => void;
  onRemove: () => void;
  trackID: string;
  place: number;
}

export function TrackCard({ onPlay, onRemove, trackID, place }: TrackCardProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [trackObj, setTrackObj] = useState<TrackDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { show } = usePopup();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const card = cardRef.current;
      const menu = optionsRef.current;

      if (!card || !menu) return;

      const clickedOutside =
        !card.contains(e.target as Node) &&
        !menu.contains(e.target as Node);

      if (clickedOutside) setOptionsOpen(false);
    }

    const getTrackFromDatabase = async () => {
      setTrackObj(await getTrack(trackID));
      setLoading(false);
    }
    document.addEventListener("click", handleClickOutside);
    getTrackFromDatabase();

    return () => document.removeEventListener("click", handleClickOutside);
  }, [])

  if (loading) {
    return <p className="track-card-loading-text"> Loading... </p>
  }

  return (
    <div
      className="track-card"
      ref={cardRef}
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
          setOptionsOpen(!optionsOpen);
        }}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      {(optionsOpen == true) &&
        <div className="track-card-options" ref={optionsRef}>
          <span onClick={(e) => {
            audioController.enqueue(trackObj);
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <QueueMusicIcon />
            Add to queue
          </span>
          <span onClick={(e) => {
            show(<TrackManagerPopup />);
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <PlaylistAddIcon />
            Add to playlist...
          </span>
        </div>
      }
      <div className="track-card-duration">{Math.floor(trackObj.duration / 60)}:{String(Math.floor(trackObj.duration) % 60).padStart(2, '0')}</div>
    </div>
  );
}