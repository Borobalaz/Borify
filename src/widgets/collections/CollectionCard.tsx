import { IconButton } from "@mui/material";
import "./CollectionCard.css";
import { CollectionDTO } from "../../backend/database/DTOs";
import { deleteCollection } from "../../backend/database/collectionsCRUD";
import { useEffect, useRef, useState } from "preact/hooks";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { usePopup } from "../../utility/PopupContext";
import { ModifyCollectionPopup } from "./ModifyCollectionPopup";

interface CollectionCardProps {
  collection: CollectionDTO;
  onClick: (selectedCollection) => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {

  const [optionsOpen, setOptionsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { show } = usePopup();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOptionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const imageUrl = collection.cover instanceof Blob ?
    URL.createObjectURL(collection.cover) :
    collection.cover || "cover_placeholder.png";

  async function deleteCollectionFromDatabase() {
    try {
      await deleteCollection(collection.collection_id);
    } catch (err) {
      console.error("Failed to delete collection", err);
    }
  }

  return (
    <div className="collection-card"
      ref={cardRef}
      onClick={() => onClick(collection)}>
      <img className="collection-image" src={imageUrl} />
      <div className="collection-info" >
        <div className="collection-title">{collection.title}</div>
        <div className="collection-description">{collection.description}</div>
      </div>
      {(collection.title != "All Tracks" &&
        <IconButton className="collection-card-button"
          onClick={(e) => {
            e.stopPropagation();
            setOptionsOpen(!optionsOpen);
          }}>
          <MoreHorizIcon />
        </IconButton>
      )}
      {
        (optionsOpen == true) &&
        <div className="collection-card-options">
          <span onClick={(e) => {
            deleteCollectionFromDatabase();
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <DeleteOutlineIcon />
            Delete
          </span>
          <span onClick={(e) => {
            show(<ModifyCollectionPopup collection={collection} />);
            setOptionsOpen(false);
            e.stopPropagation();
          }}>
            <DriveFileRenameOutlineIcon />
            Modify
          </span>
        </div>
      }
    </div >
  );
}