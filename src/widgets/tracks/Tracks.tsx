import { TrackCard } from "./TrackCard";
import "./Tracks.css";
import { TracksHeader } from "./TracksHeader";

export function Tracks() {

    const tracks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <div className="tracks-widget">
            <TracksHeader />
            <div className="tracks-list">
                {tracks.map((track) => (
                    <TrackCard />
                ))}
            </div>
        </div>
    );
}