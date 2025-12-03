import { useEffect, useState } from "preact/hooks";
import { CollectionDTO, TrackDTO } from "../../backend/database/DTOs";
import { getAllCollections, addTrackToCollection, removeTrackFromCollection } from "../../backend/database/collectionsCRUD";
import "./TrackManagerPopup.css";
import { usePopup } from "../../utility/PopupContext";

interface TrackManagerPopupProps {
  track: TrackDTO; // TrackDTO or simplified type
}

export function TrackManagerPopup({ track }: TrackManagerPopupProps) {
  const [collections, setCollections] = useState<CollectionDTO[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { hide } = usePopup();

  useEffect(() => {
    async function fetchCollections() {
      const cols = await getAllCollections();
      setCollections(cols);

      // pre-fill checkboxes if track already exists in collections
      const selected = new Set<string>();
      cols.forEach(col => {
        if (col.tracks?.some(tId => tId === track.track_id)) {
          selected.add(col.collection_id);
        }
      });

      setSelectedIds(selected);
      setLoading(false);
    }
    fetchCollections();
  }, []);

  const handleToggle = async (collection: CollectionDTO) => {
    const newSelected = new Set(selectedIds);
    if (selectedIds.has(collection.collection_id)) {
      // Remove track immediately
      await removeTrackFromCollection(collection, track.track_id);
      newSelected.delete(collection.collection_id);
    }
    else {
      // Add track immediately
      await addTrackToCollection(collection, track.track_id);
      newSelected.add(collection.collection_id);
    }
    setSelectedIds(newSelected);
  };

  if (loading) return <div className="track-manager-popup">Loading collections...</div>;

  return (
    <div className="track-manager-popup">
      <h3>Add "{track.title}" to collections</h3>
      <ul className="track-manager-collection-list">
        {collections.map(col => (
          <li key={col.collection_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.has(col.collection_id)}
                onChange={() => handleToggle(col)}
              />
              {col.title}
            </label>
          </li>
        ))}
      </ul>
      <div className="track-manager-buttons">
        <button onClick={() => hide()}>
          Close
        </button>
      </div>
    </div>
  );
}
