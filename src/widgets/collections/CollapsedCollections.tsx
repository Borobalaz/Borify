import { useEffect, useState } from "preact/hooks";
import "./CollapsedCollections.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CollectionDTO } from "../../backend/database/DTOs";
import { getAllCollections } from "../../backend/database/collectionsCRUD";
import { onCollectionsUpdated } from "../../backend/database/databaseEvents";

interface CollapsedCollectionsProps {
  onExpand: () => void;
}

export function CollapsedCollections({ onExpand }: CollapsedCollectionsProps) {

  const [collections, setCollections] = useState<CollectionDTO[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      const allCollections = await getAllCollections();
      setCollections(allCollections);
    };
    loadCollections();
    onCollectionsUpdated(loadCollections);
  }, []);

  return (
    <div className="collapsed-collections-widget">
      <div className="collapsed-collections-header">
        <KeyboardArrowRightIcon
          className="collapsed-collections-expand-icon"
          onClick={onExpand}
        />
      </div>
      <div className="collapsed-collections-list">
        {collections.map((c) => (
          <img
            className="collapsed-collection-image"
            src={c.cover instanceof Blob ?
              URL.createObjectURL(c.cover) :
              c.cover || "collection_placeholder.jpg"}
          />
        ))}
      </div>
    </div>
  );
}