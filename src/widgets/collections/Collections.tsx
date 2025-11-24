import { useEffect, useState } from "preact/hooks";
import { CollectionCard } from "./CollectionCard";
import "./Collections.css";
import { CollectionsHeader } from "./CollectionsHeader";
import { CollectionDTO } from "../../backend/database/DTOs";
import { getAllCollections } from "../../backend/database/collectionsCRUD";
import { offCollectionsUpdated, onCollectionsUpdated } from "../../backend/database/databaseEvents";
import { initDB } from "../../backend/database/initDatabase";
import { getAllTracks } from "../../backend/database/tracksCRUD";

interface CollectionsProps {
  onCollapse: () => void;
  onSelectedCollectionChange: (selectedCollection) => void;
}

export function Collections({ onCollapse, onSelectedCollectionChange}: CollectionsProps) {

  const [collections, setCollections] = useState<CollectionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      await initDB();
      const allCollections = await getAllCollections();
      setCollections(allCollections);
      setLoading(false)
    };
    onCollectionsUpdated(loadCollections);
    loadCollections();
  
    return () => {
      offCollectionsUpdated(loadCollections);
    };
  }, []);

  return (
    <div className="collections-widget">
      <CollectionsHeader
        onCollapse={onCollapse} />
      {(loading ?
        <p className="collections-list-loading-text">Loading...</p> :
        <div className="collections-list">
          {collections.map((c) => (
            <CollectionCard 
              collection={c} 
              onClick={onSelectedCollectionChange}/>
          ))}
        </div>
      )}
    </div>
  );
} 