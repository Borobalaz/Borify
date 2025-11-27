import { getCollection } from "./collectionsCRUD";
import { emitTracksUpdated, emitCollectionsUpdated } from "./databaseEvents";
import { TrackDTO } from "./DTOs";
import { db } from "./initDatabase";

export async function addTrack(track: TrackDTO) {
  await db.add("Tracks", track);
  emitTracksUpdated();
}

export async function getTrack(id: string) {
  return await db.get("Tracks", id);
}

export async function getTracks(col_id: string): Promise<TrackDTO[]> {
  const collection = await getCollection(col_id);
  if (!collection) return [];

  const trackIds = collection.tracks;
  const tracks: TrackDTO[] = [];

  for (const id of trackIds) {
    const track = await getTrack(id);
    if (track) tracks.push(track);
  }

  return tracks;
}

export async function getAllTracks() {
  return await db.getAll("Tracks");
}

export async function updateTrack(track: TrackDTO) {
  await db.put("Tracks", track);
  emitTracksUpdated();
}

export async function deleteTrack(id: string) {
  await db.delete("Tracks", id);

  // remove this track id from any collections that reference it
  try {
    const collections = await db.getAll("Collections");
    let changed = false;
    for (const coll of collections) {
      if (Array.isArray(coll.tracks) && coll.tracks.includes(id)) {
        coll.tracks = coll.tracks.filter((t: string) => t !== id);
        await db.put("Collections", coll);
        changed = true;
      }
    }
    if (changed) {
      emitCollectionsUpdated();
    }
  } catch (e) {
    console.error("Error while removing track references from collections:", e);
  }

  emitTracksUpdated();
}
