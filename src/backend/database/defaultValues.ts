import { CollectionDTO, TrackDTO } from "./DTOs";
import { addTrack } from "./tracksCRUD";
import { addCollection } from "./collectionsCRUD";

let response;

export const defaultTracksData = [
  {
    track_id: "t1",
    title: "Message",
    artist: "Hakumba",
    audioPath: "/audio/message-audio.mp3", // public path to file
  },
  {
    track_id: "t2",
    title: "Canvas",
    artist: "Hakumba",
    audioPath: "/audio/canvas-audio.mp3",
  },
  {
    track_id: "t3",
    title: "Ex's and Oh's [Nightcore]",
    artist: "Ellie King x Nightcore Venyx",
    audioPath: "/audio/exsohs-audio.mp3",
  },
];

export const defaultCollectionsData = [
  {
    collection_id: "c1",
    title: "Message",
    description: "Hakumba",
    coverPath: "/covers/message-cover.jpg",
    tracks: ["t1", "t2"],
  },
  {
    collection_id: "c2",
    title: "Nightcore",
    description: "",
    coverPath: "/covers/nightcore-cover.jpg",
    tracks: ["t3"],
  },
];

export async function loadDefaultData() {
  const tracks: TrackDTO[] = [];
  for (const t of defaultTracksData) {
    const audioResp = await fetch(t.audioPath);
    const audioBlob = await audioResp.blob();

    tracks.push({
      track_id: t.track_id,
      title: t.title,
      artist: t.artist,
      audio: audioBlob,
      duration: await getDurationWithWebAudio(audioBlob),
    });
  }

  const collections: CollectionDTO[] = [];
  for (const c of defaultCollectionsData) {
    let coverBlob: Blob | null = null;
    if (c.coverPath) {
      const coverResp = await fetch(c.coverPath);
      coverBlob = await coverResp.blob();
    }

    collections.push({
      collection_id: c.collection_id,
      title: c.title,
      description: c.description,
      cover: coverBlob,      // Blob or null
      tracks: c.tracks,
    });
  }

  for (const t of tracks) {
    await addTrack(t);
  }
  for (const c of collections) {
    await addCollection(c);
  }

  console.log("Default tracks and collections loaded");
}

async function getDurationWithWebAudio(blob: Blob): Promise<number> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new AudioContext();
  const decoded = await audioCtx.decodeAudioData(arrayBuffer);
  return decoded.duration;
}
