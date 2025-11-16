import { Collections } from "../widgets/collections/Collections";
import { MusicPlayerBar } from "../widgets/MusicPlayerBar";
import { TopBar } from "../widgets/TopBar";
import { Tracks } from "../widgets/tracks/Tracks";
import "./MainScreen.css";

export function MainScreen() {
    return (
        <div className="main-screen">
            <TopBar />
            <Collections />
            <Tracks />
            <MusicPlayerBar />
        </div>
    );
}