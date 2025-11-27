import { IconButton } from "@mui/material";
import { CollectionDTO, TrackDTO } from "../../backend/database/DTOs";
import "./TracksHeader.css";
import UploadIcon from '@mui/icons-material/Upload';
import { usePopup } from "../../utility/PopupContext";
import { AddTrackPopup } from "./AddTrackPopup";
import { audioController } from "../../backend/audio-player/AudioController";
import { getTrack } from "../../backend/database/tracksCRUD";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ShuffleToggle } from "../ShuffleToggle";

interface TracksHeaderProps {
  collection: CollectionDTO;
}

export function TracksHeader({ collection }: TracksHeaderProps) {

  const { show } = usePopup();

  const imageUrl = collection?.cover ?
    URL.createObjectURL(collection.cover) :
    "cover_placeholder.png";

  async function playCollection() {
    if (!collection || !collection.tracks || collection.tracks.length === 0) {
      console.warn("Collection is empty or invalid");
      return;
    }
    let tracks: TrackDTO[] = [];
    for (const trackId of collection.tracks) {
      try {
        const track: TrackDTO = await getTrack(trackId);
        if (track) {
          tracks.push(track);
        } else {
          console.warn(`Track not found: ${trackId}`);
        }
      } catch (err) {
        console.error(`Failed to get track ${trackId}:`, err);
      }
    }
    audioController.setQueue(tracks);
    audioController.play();
  }

  if (!collection)
    return (
      <div>
        ASD
      </div>
    );
  return (
    <div className="tracks-header">
      <img className="tracks-header-image" src={imageUrl} />
      <div className="tracks-header-info">
        <div className="tracks-header-label">PLAYLIST</div>
        <div className="tracks-header-title">{collection.title}</div>
        <div className="tracks-header-description">{collection.description}</div>
      </div>
      <div className="tracks-header-buttons">
        <div className="tracks-header-new-track">
          <p>Upload new track to playlist</p>
          <IconButton
            className="tracks-new-icon-button"
            onClick={() => show(<AddTrackPopup collection={collection} />)}>
            <UploadIcon />
          </IconButton>
        </div>
        <div className="tracks-header-play-collection">
          <IconButton
            className="tracks-header-play-collection-button"
            onClick={() => playCollection()}>
            <PlayArrowIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}