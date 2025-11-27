import { IconButton } from "@mui/material";
import "./ModifyCollectionPopup.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "preact/hooks";
import { addCollection, updateCollection } from "../../backend/database/collectionsCRUD";
import { usePopup } from "../../utility/PopupContext";
import { CollectionDTO } from "../../backend/database/DTOs";

interface ModifyCollectionPopupProps {
  collection: CollectionDTO;
}

export function ModifyCollectionPopup({ collection }: ModifyCollectionPopupProps) {

  let [title, setTitle] = useState(collection.title);
  let [description, setDescription] = useState(collection.description);
  let [cover, setCover] = useState(collection.cover);
  const { hide } = usePopup();

  async function modifyCollection() {
    try {
      await updateCollection({
        collection_id: collection.collection_id,
        title: title,
        description: description,
        cover: cover,
        tracks: collection.tracks,
      });
    } catch (err) {
      console.error("Failed to create collection", err);
    }
  }

  return (
    <div className="modify-collection-popup">
      <h1>Modify Collection</h1>
      <input
        type="text"
        placeholder="Collection Name"
        className="collection-name-input"
        defaultValue={collection.title}
        onChange={(e) => setTitle(e.currentTarget.value)} />
      <textarea
        placeholder="Collection Description"
        className="collection-description-input"
        maxLength={50}
        defaultValue={collection.description}
        onChange={(e) => setDescription(e.currentTarget.value)} />
      <div className="collection-cover-label">
        <p>Collection Cover:</p>
        {collection.cover && (
          <img
            className="cover-preview"
            src={URL.createObjectURL(collection.cover)}
          />
        )}
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
          modifyCollection();
          hide();
        }}>
        <CheckCircleOutlineIcon />
      </IconButton>
    </div>
  );
}