import { useState } from "react";
import { CollectionCreatorPopup } from "../widgets/collections/CollectionCreatorPopup";
import { Collections } from "../widgets/collections/Collections";
import { MusicPlayerBar } from "../widgets/playerBar/MusicPlayerBar";
import { TopBar } from "../widgets/TopBar";
import { Tracks } from "../widgets/tracks/Tracks";
import "./MainScreen.css";

interface MainScreenProps {
    onPlayTrack?: () => void;
    onThemeChange?: () => void;
}

export function MainScreen({onPlayTrack, onThemeChange}: MainScreenProps) {

    let [isCollectionCreatorOpen, setIsCollectionCreatorOpen] = useState(false);

    return (
        <div className="main-screen">
            <TopBar onThemeChange={onThemeChange}/>
            <Collections 
                onCreateNewCollection={() => setIsCollectionCreatorOpen(true)} />
            <Tracks onPlayTrack={onPlayTrack}/>
            <MusicPlayerBar />

            <CollectionCreatorPopup
                open={isCollectionCreatorOpen}
                onClose={() => setIsCollectionCreatorOpen(false)} />
        </div>
    );

}

