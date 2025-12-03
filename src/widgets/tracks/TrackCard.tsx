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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { removeTrackFromCollection } from "../../backend/database/collectionsCRUD";

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
  const { show } = usePopup();

  function handleClickOutside(e: MouseEvent) {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setOptionsOpen(false);
    }
  }

  const getTrackFromDatabase = async () => {
    setTrackObj(await getTrack(trackID));
    setLoading(false);
  }

  useEffect(() => {
    getTrackFromDatabase();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  if (loading) {
    return <p className="track-card-loading-text"> Loading... </p>
  }

  return (
    <div
      className="track-card"
      ref={cardRef}
      onMouseEnter={() => { if (!optionsOpen) setIsHovered(true); }}
      onMouseLeave={() => { if (!optionsOpen) setIsHovered(false); }}
      onFocus={() => { if (!optionsOpen) setIsHovered(true); }}
      onBlur={() => { if (!optionsOpen) setIsHovered(false); }}
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
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOptionsOpen(!optionsOpen);
        }}>
        <MoreHorizIcon />
      </IconButton>
      {
        (optionsOpen == true) &&
        <div className="track-card-options">
          <span onClick={(e) => {
            audioController.enqueue(trackObj);
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <QueueMusicIcon />
            Add to queue
          </span>
          <span onClick={(e) => {
            show(<TrackManagerPopup track={trackObj} />);
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <PlaylistAddIcon />
            Add to playlist...
          </span>
          <span onClick={(e) => {
            onRemove();
            e.stopPropagation();
          }}>
            <RemoveCircleOutlineIcon />
            Remove
          </span>
          <span onClick={(e) => {
            deleteTrack(trackObj.track_id);
            e.stopPropagation();
          }}>
            <DeleteSweepIcon />
            Delete
          </span>
        </div>
      }
      <div className="track-card-duration">{Math.floor(trackObj.duration / 60)}:{String(Math.floor(trackObj.duration) % 60).padStart(2, '0')}</div>
    </div>
  );
}