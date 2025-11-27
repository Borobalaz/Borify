import { useEffect, useState } from "preact/hooks";
import "./TrackLabel.css";
import { audioController } from "../../backend/audio-player/AudioController";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from "@mui/material";

interface TrackLabelProps {
  onOpenPlayer?: () => void;
}

export function TrackLabel({ onOpenPlayer }: TrackLabelProps) {

  const [title, setTitle] = useState<string | null>();
  const [artist, setArtist] = useState<string | null>();
  //const [cover, setCover] = useState<Blob | null>();

  useEffect(() => {
    const handleTitle = () => setTitle(audioController.getCurrentTrack()?.title);
    const handleArtist = () => setArtist(audioController.getCurrentTrack()?.artist);
    //const handleCover = () => setCover(audioController.getCurrentTrack()?.);

    audioController.on("trackChange", handleTitle);
    audioController.on("trackChange", handleArtist);

    // Set initial values on mount
    setTitle(audioController.getCurrentTrack()?.title);
    setArtist(audioController.getCurrentTrack()?.artist);

    return () => {
      audioController.off("trackChange", handleTitle);
      audioController.off("trackChange", handleArtist);
    };
  }, []);

  return (
    <div className="track-label">
      <IconButton className="open-player-button"
        onClick={() => (onOpenPlayer && onOpenPlayer())}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <img
        className="track-label-collection-cover"
        src="./cover_placeholder.png"
        hidden={true} />
      <p>{title} - {artist}</p>
    </div>
  );
}