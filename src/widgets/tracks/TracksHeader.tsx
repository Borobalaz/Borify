import { IconButton } from "@mui/material";
import { CollectionDTO } from "../../backend/database/DTOs";
import "./TracksHeader.css";
import UploadIcon from '@mui/icons-material/Upload';
import { usePopup } from "../../utility/PopupContext";
import { AddTrackPopup } from "./AddTrackPopup";

interface TracksHeaderProps {
  collection: CollectionDTO;
}

export function TracksHeader({ collection }: TracksHeaderProps) {

  const {show} = usePopup();

  const imageUrl = collection.cover instanceof Blob ?
    URL.createObjectURL(collection.cover) :
    collection.cover || "collection_placeholder.jpg";

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
            onClick={() => show(<AddTrackPopup collection={collection}/>)}>
            <UploadIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}