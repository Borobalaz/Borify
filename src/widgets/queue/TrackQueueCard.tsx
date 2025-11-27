import { useEffect, useState } from "preact/hooks";
import "./TrackQueueCard.css"
import { TrackDTO } from "../../backend/database/DTOs";
import { getTrack } from "../../backend/database/tracksCRUD";
import EqualizerIcon from '@mui/icons-material/Equalizer';

interface TrackQueueCardProps {
  trackID: string;
  place: number;
  playing: boolean;
}

export function TrackQueueCard({ trackID, place, playing }: TrackQueueCardProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [trackObj, setTrackObj] = useState<TrackDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrackFromDatabase = async () => {
      setTrackObj(await getTrack(trackID));
      setLoading(false);
    };
    getTrackFromDatabase();
  }, [])

  if (loading) {
    return <p className="track-queue-card-loading-text"> Loading... </p>
  }

  return (
    <div
      className={`track-queue-card ${playing ? "now-playing" : ""}`} onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      {(
        playing ?
          <EqualizerIcon className="track-queue-card-id" />
          :
          <div className="track-queue-card-id">{place}</div>
      )}
      <div className="track-queue-card-info">
        <div className="track-queue-card-title">{trackObj.title}</div>
        <div className="track-queue-card-artist">{trackObj.artist}</div>
      </div>
    </div>
  );

}