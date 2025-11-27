import { CollectionDTO, TrackDTO } from "./DTOs";
import { addTrack } from "./tracksCRUD";
import { addCollection } from "./collectionsCRUD";

export const defaultTracksData = [
  {
    track_id: "t1",
    title: "Funky Intro",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-FunkyIntro.mp3", // public path to file
  },
  {
    track_id: "t2",
    title: "Banánaszká",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Bananaszka.mp3",
  },
  {
    track_id: "t3",
    title: "Don't lie",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Don'tlie.mp3", // public path to file
  },
  {
    track_id: "t4",
    title: "Scottsman",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Scotsman.mp3",
  },
  {
    track_id: "t5",
    title: "Throw up",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Throwup.mp3", // public path to file
  },
  {
    track_id: "t6",
    title: "House of the Rising Sun",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-HouseoftheRisingSun.mp3",
  },
  {
    track_id: "t7",
    title: "No Rabbit",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Norabbit.mp3", // public path to file
  },
  {
    track_id: "t8",
    title: "Love Buzz",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-LoveBuzz.mp3",
  },
  {
    track_id: "t9",
    title: "Nem lesz eső",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Nemleszeso.mp3",
  },
  {
    track_id: "t10",
    title: "La Fiesta",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-La-FiEsta.mp3",
  },
  {
    track_id: "t11",
    title: "Mariannina",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Mariannina.mp3",
  },
  {
    track_id: "t12",
    title: "Tabak",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Tabak.mp3",
  },
  {
    track_id: "t14",
    title: "Narcissus",
    artist: "Hakumba",
    audioPath: "audio/HAKUMBA-Narcissus.mp3",
  },
  {
    track_id: "t15",
    title: "Ex's and Oh's [Nightcore]",
    artist: "Ellie King x Nightcore Venyx",
    audioPath: "audio/NightcoreEx's&Oh's-ElleKing(Lyrics).mp3",
  },
  {
    track_id: "t16",
    title: "This Little Girl",
    artist: "Nightcore",
    audioPath: "audio/Nightcore-ThisLittleGirl.mp3",
  },
  {
    track_id: "t17",
    title: "Ott, ahol zúg az a négy folyó [Nightcore]",
    artist: "Kárpátia",
    audioPath: "audio/Karpatia-Ott,aholzugazanegyfolyo(HardNightcore).mp3",
  },
];

export const defaultCollectionsData = [
  {
    collection_id: "c1",
    title: "Véletlen volt nem direkt",
    description: "Hakumba",
    coverPath: "covers/veletlen-volt.jpeg",
    tracks: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t14"],
  },
  {
    collection_id: "c2",
    title: "Nightcore",
    description: "",
    coverPath: "covers/nightcore-cover.jpg",
    tracks: ["t15", "t16", "t17"],
  },
];

export async function loadDefaultData(): Promise<void> {
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
      cover: coverBlob,
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
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(blob);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
      URL.revokeObjectURL(audio.src);
    });
  });
}
