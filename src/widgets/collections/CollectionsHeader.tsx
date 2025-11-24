import { Button, IconButton } from "@mui/material";
import "./CollectionsHeader.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { usePopup } from "../../utility/PopupContext";
import { CollectionCreatorPopup } from "./CollectionCreatorPopup";

interface CollectionsHeaderProps {
  onCollapse?: () => void;
}

export function CollectionsHeader({ onCollapse }: CollectionsHeaderProps) {
  
  const {show} = usePopup();

  return (
    <div className="collections-header">
      <div className="collections-header-title"> Collections </div>
      <div className="collections-header-actions">
        <IconButton
          className="collections-new-button"
          color="inherit"
          onClick={() => show(<CollectionCreatorPopup/>)}>
          <AddCircleOutlineIcon 
            className="collections-new-icon"/>
        </IconButton>
        <KeyboardArrowLeftIcon
          className="collections-back-icon"
          onClick={onCollapse} />
      </div>
    </div>
  );
}