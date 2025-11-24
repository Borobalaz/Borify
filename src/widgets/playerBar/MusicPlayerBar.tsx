import "./MusicPlayerBar.css";
import { PlaybackControls } from "./PlaybackControls";
import { TrackLabel } from "./TrackLabel";
import { VolumeControl } from "./VolumeControl";

interface MusicPlayerBarProps {
  onOpenPlayer?: () => void;
}

export function MusicPlayerBar({ onOpenPlayer }: MusicPlayerBarProps) {
  return (
    <div className="music-player-bar">
      <TrackLabel onOpenPlayer={() => (onOpenPlayer && onOpenPlayer())}/>
      <PlaybackControls />
      <VolumeControl />
    </div>
  );
}