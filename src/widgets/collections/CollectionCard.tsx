import { IconButton } from "@mui/material";
import "./CollectionCard.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CollectionDTO } from "../../backend/database/DTOs";
import { deleteCollection } from "../../backend/database/collectionsCRUD";

interface CollectionCardProps {
  collection: CollectionDTO;
  onClick: (selectedCollection) => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {

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
    <div className="collection-card" onClick={() => onClick(collection)}>
      <img className="collection-image" src={imageUrl} />
      <div className="collection-info" >
        <div className="collection-title">{collection.title}</div>
        <div className="collection-description">{collection.description}</div>
      </div>
      {(collection.title != "All Tracks" &&
        <IconButton className="collection-card-delete"
          onClick={() => { deleteCollectionFromDatabase() }}>
          <DeleteOutlineIcon />
        </IconButton>  
      )}
    </div>
  );
}