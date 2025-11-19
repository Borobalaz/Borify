import { IconButton } from "@mui/material";
import "./CollectionCreatorPopup.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface PopupProps {
  open: boolean;
  onClose: () => void;
}


export function CollectionCreatorPopup({ open, onClose }: PopupProps) {

  if (!open) {
    return null;
  }

  return (
    <div className="collection-creator-popup">
      <h1>Create New Collection</h1>  
      <input 
        type="text" 
        placeholder="Collection Name" 
        className="collection-name-input" />
      <textarea 
        placeholder="Collection Description" 
        className="collection-description-input" 
        maxLength={50}/>
      <div className="collection-cover-label">
        <p>Collection Cover:</p>
        <input type="file" className="collection-cover-input" />
      </div>
      <IconButton className="create-collection-button" onClick={onClose}>
        <CheckCircleOutlineIcon />
      </IconButton>
    </div>
  );
}