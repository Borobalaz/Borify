import { useState } from "preact/hooks";
import "./AddTrackPopup.css"
import { usePopup } from "../../utility/PopupContext";
import { Button, IconButton } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { addTrack } from "../../backend/database/tracksCRUD";
import { CollectionDTO } from "../../backend/database/DTOs";
import { updateCollection } from "../../backend/database/collectionsCRUD";

interface AddTrackPopupProps {
  collection?: CollectionDTO
}

export function AddTrackPopup({ collection }: AddTrackPopupProps) {

  let [title, setTitle] = useState("");
  let [artist, setArtist] = useState("");
  let [audio, setAudio] = useState(null);
  const { hide } = usePopup();

  async function addTrackToDatabase() {
    try {
      if (!audio) {
        console.error("No audio file selected.");
        return;
      }

      let duration: number;
      try {
        duration = await getDurationWithWebAudio(audio);
      } catch (err) {
        console.error("Invalid or unsupported audio file:", err);
        alert("This file is not a valid audio file.");
        return;
      }

      const safeTitle =
        title?.trim() ? title.trim() :
          audio?.name?.replace(/\.[^/.]+$/, "") || "Unknown Title";

      const safeArtist =
        artist?.trim() ? artist.trim() : "Unknown";

      let track = {
        track_id: crypto.randomUUID(),
        title: safeTitle,
        artist: safeArtist,
        audio: audio,
        duration: Math.floor(duration),
      };

      await addTrack(track);

      if (collection) {
        collection.tracks.push(track.track_id);
        await updateCollection(collection);
      }
    } catch (err) {
      console.error("Failed to add track", err);
    }
  }

  async function getDurationWithWebAudio(blob: Blob): Promise<number> {
    const arrayBuffer = await blob.arrayBuffer();
    const audioCtx = new AudioContext();
    const decoded = await audioCtx.decodeAudioData(arrayBuffer);
    return decoded.duration;
  }

  return (
    <div className="add-track-popup">
      <h1>Upload track</h1>
      <input
        type="text"
        placeholder="Title"
        className="track-title-input"
        onChange={(e) => setTitle(e.currentTarget.value)} />
      <input
        type="text"
        placeholder="Artist"
        className="track-artist-input"
        onChange={(e) => setArtist(e.currentTarget.value)} />
      <div
        className="track-new-audio drop-zone"
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) setAudio(file);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Audio file:</p>
        <Button variant="contained" component="label">
          {audio?.name || "Drop or Click"}
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) setAudio(file);
            }}
          />
        </Button>
      </div>

      <IconButton
        className="track-new-button"
        onClick={() => {
          addTrackToDatabase();
          hide();
        }}>
        <UploadIcon />
      </IconButton>

    </div>
  );
}