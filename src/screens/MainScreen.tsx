import { useState } from "react";
import { CollectionCreatorPopup } from "../widgets/collections/CollectionCreatorPopup";
import { Collections } from "../widgets/collections/Collections";
import { MusicPlayerBar } from "../widgets/playerBar/MusicPlayerBar";
import { TopBar } from "../widgets/TopBar";
import { Tracks } from "../widgets/tracks/Tracks";
import "./MainScreen.css";
import { CollapsedCollections } from "../widgets/collections/CollapsedCollections";
import { useEffect } from "react";
import { initDB } from "../backend/database/initDatabase";
import { getAllCollections } from "../backend/database/collectionsCRUD";
import { CollectionDTO } from "../backend/database/DTOs";

interface MainScreenProps {
  onPlayTrack?: () => void;
  onThemeChange?: () => void;
  onOpenPlayer?: () => void;
}

export function MainScreen({ onPlayTrack, onThemeChange, onOpenPlayer }: MainScreenProps) {

  let [collectionCollapsed, setCollectionCollapsed] = useState(false);
  let [selectedCollection, setSelectedCollection] = useState<CollectionDTO>(null);

  useEffect(() => {
    const getFirstCollection = async () => {
      await initDB();
      const allCollections = await getAllCollections();
      if(allCollections.length == 0)
      {
        setSelectedCollection(null);
      }
      else{
        setSelectedCollection(allCollections[0])
      }
    };
    getFirstCollection();
  }, []);

  return (
    <div className={"main-screen" + (collectionCollapsed ? " collapsed-collections" : "")}>
      <TopBar onThemeChange={onThemeChange} />
      {collectionCollapsed ? (
        <CollapsedCollections
          onExpand={() => setCollectionCollapsed(false)}
        />
      ) : (
        <Collections
          onCollapse={() => setCollectionCollapsed(true)}
          onSelectedCollectionChange={setSelectedCollection}
        />
      )}
      <Tracks 
        onPlayTrack={onPlayTrack} 
        collection_id={selectedCollection?.collection_id} 
        />
      <MusicPlayerBar onOpenPlayer={() => (onOpenPlayer && onOpenPlayer())}/>

    </div>
  );

}

