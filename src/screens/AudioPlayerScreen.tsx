import { useEffect, useState } from "preact/hooks";
import { AudioPlayerControls } from "../widgets/audioPlayer/AudioPlayerControls";
import { AudioPlayerTopBar } from "../widgets/audioPlayer/AudioPlayerTopBar";
import "./AudioPlayerScreen.css";
import { audioController } from "../backend/audio-player/AudioController";
import { CollectionDTO, TrackDTO } from "../backend/database/DTOs";
import { getAllCollections } from "../backend/database/collectionsCRUD";

interface AudioPlayerScreenProps {
  onReturn?: () => void;
}


export function AudioPlayerScreen({ onReturn }: AudioPlayerScreenProps) {

  const [currentTrack, setCurrentTrack] = useState<TrackDTO | null>();
  const [title, setTitle] = useState<string | null>();
  const [artist, setArtist] = useState<string | null>();
  const [cover, setCover] = useState<Blob | null>();

  useEffect(() => {
    const handleTitle = () => setTitle(audioController.getCurrentTrack()?.title);
    const handleArtist = () => setArtist(audioController.getCurrentTrack()?.artist);
    const handleCurrentTrack = async () => {
      const track = audioController.getCurrentTrack();
      setCurrentTrack(track);
      let collection: CollectionDTO | null = null; // default to null

      if (track) {
        let allCollections = await getAllCollections();
        collection = allCollections.find((col) => col.tracks.includes(track.track_id) && col.title != "All Tracks") || null;
      }
      setCover(collection?.cover);
    }

    audioController.on("trackChange", handleTitle);
    audioController.on("trackChange", handleArtist);
    audioController.on("trackChange", handleCurrentTrack);

    // Set initial values on mount
    setTitle(audioController.getCurrentTrack()?.title);
    setArtist(audioController.getCurrentTrack()?.artist);
    handleCurrentTrack();

    return () => {
      audioController.off("trackChange", handleTitle);
      audioController.off("trackChange", handleArtist);
      audioController.off("trackChange", handleCurrentTrack);
    };
  }, []);

  function getImageUrl(coverBlob) {
    return coverBlob instanceof Blob ?
      URL.createObjectURL(coverBlob) :
      coverBlob || "cover_placeholder.png";
  }

  return (
    <div className="audio-player-screen" >
      <AudioPlayerTopBar onReturn={onReturn} />
      <img className="audio-player-image" src={getImageUrl(cover)}></img>
      <div className="audio-player-info">
        <p className="audio-player-title"> {title} </p>
        <p className="audio-player-artist"> {artist} </p>
      </div>
      <AudioPlayerControls />
    </div>
  );
}