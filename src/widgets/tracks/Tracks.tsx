import { useEffect, useState } from "preact/hooks";
import { TrackCard } from "./TrackCard";
import "./Tracks.css";
import { TracksHeader } from "./TracksHeader";
import { CollectionDTO } from "../../backend/database/DTOs";
import { onTracksUpdated, offTracksUpdated, onCollectionsUpdated, offCollectionsUpdated } from "../../backend/database/databaseEvents";
import { getCollection } from "../../backend/database/collectionsCRUD";

interface TracksProps {
  onPlayTrack?: () => void;
  collection_id?: string;
}

export function Tracks({ onPlayTrack, collection_id }: TracksProps) {

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<CollectionDTO>(null);

  useEffect(() => {
    const loadCollection = async () => {
      if (!collection_id) {
        setCollection(null);
        setLoading(true);
        return;
      }

      const collection = await getCollection(collection_id);
      if (collection == null) {
        setCollection(null);
        setLoading(false);
      }
      else {
        setCollection(collection);
        setLoading(false);
      }
    };

    setLoading(true);
    loadCollection();
    onTracksUpdated(loadCollection);
    onCollectionsUpdated(loadCollection);

    return () => {
      try { offTracksUpdated(loadCollection); } catch (e) { /* ignore */ }
      try { offCollectionsUpdated(loadCollection); } catch (e) { /* ignore */ }
    };
  }, [collection_id]);

  if (loading) {
    return <p className="tracks-widget-loading-text"> Loading... </p>
  }

  return (
    <div className="tracks-widget">
      <TracksHeader
        collection={collection} />
      <div className="tracks-list">
        {(collection ?
          collection.tracks.map((track, index) => (
            <TrackCard
              onPlay={onPlayTrack}
              trackID={track}
              place={index + 1} />
          ))
          :
          "ASD"
        )}
      </div>
    </div>
  );
}