import "./MusicPlayerBar.css";
import { PlaybackControls } from "./PlaybackControls";
import { TrackLabel } from "./TrackLabel";
import { VolumeControl } from "./VolumeControl";

export function MusicPlayerBar() {
    return (
        <div className="music-player-bar">
            <TrackLabel />
            <PlaybackControls />
            <VolumeControl />
        </div>
    );
}