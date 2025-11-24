import { IconButton } from "@mui/material";
import "./CollectionCreatorPopup.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "preact/hooks";
import { addCollection } from "../../backend/database/collectionsCRUD";
import { usePopup } from "../../utility/PopupContext";

interface CollectionCreatorPopupProps {
}

export function CollectionCreatorPopup({  }: CollectionCreatorPopupProps) {

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [cover, setCover] = useState(null);
  const { hide } = usePopup();

  async function addCollectionToDatabase() {
    try {
      await addCollection({
        collection_id: crypto.randomUUID(),
        title: title,
        description: description,
        cover: cover,
        tracks: [],
      });
    } catch (err) {
      console.error("Failed to create collection", err);
    }
  }

  return (
    <div className="collection-creator-popup">
      <h1>Create New Collection</h1>
      <input
        type="text"
        placeholder="Collection Name"
        className="collection-name-input"
        onChange={(e) => setTitle(e.currentTarget.value)} />
      <textarea
        placeholder="Collection Description"
        className="collection-description-input"
        maxLength={50}
        onChange={(e) => setDescription(e.currentTarget.value)} />
      <div className="collection-cover-label">
        <p>Collection Cover:</p>
        <input
          type="file"
          className="collection-cover-input"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
              setCover(file);
            }
          }} />
      </div>
      <IconButton 
        className="create-collection-button" 
        onClick={() => {
          addCollectionToDatabase();
          hide();
        }}>
        <CheckCircleOutlineIcon />
      </IconButton>
    </div>
  );
}