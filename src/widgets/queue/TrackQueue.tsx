import { useEffect, useState } from "preact/hooks";
import "./TrackQueue.css"
import { TrackQueueFooter } from "./TrackQueueFooter";
import { TrackQueueHeader } from "./TrackQueueHeader";
import { audioController } from "../../backend/audio-player/AudioController";
import { TrackDTO } from "../../backend/database/DTOs";
import { TrackQueueCard } from "./TrackQueueCard";

export function TrackQueue() {

  let [queue, setQueue] = useState<TrackDTO[]>();
  let [currentTrack, setCurrentTrack] = useState<TrackDTO | null>();

  useEffect(() => {
    const handleQueue = () => { setQueue(audioController.getQueue()) };
    const handleIndex = () => { setCurrentTrack(audioController.getCurrentTrack()) };

    audioController.on("queueUpdate", handleQueue);
    audioController.on("trackChange", handleIndex);

    return () => {
      audioController.off("queueUpdate", handleQueue);
      audioController.off("trackChange", handleIndex);
    }

  }, [])
  return (
    <div className="track-queue">
      <TrackQueueHeader />
      <div className="track-queue-list">
        {(queue ?
          queue.map((track, index) => (
            <TrackQueueCard
              key={track}
              trackID={track.track_id}
              place={index + 1} 
              playing={currentTrack?.track_id == track.track_id}/>
          ))
          :
          "Queue is empty"
        )}
      </div>
      <TrackQueueFooter />
    </div>
  );
}