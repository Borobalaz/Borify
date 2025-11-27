import { RepeatToggle } from "../RepeatToggle";
import { ShuffleToggle } from "../ShuffleToggle";
import "./TrackQueueFooter.css"

export function TrackQueueFooter() {

  return (
    <div className="track-queue-footer">
      <div className="track-footer-buttons">
        <ShuffleToggle />
        <RepeatToggle />
      </div>
    </div>
  );
}
