import { emitCollectionsUpdated } from "./databaseEvents";
import { CollectionDTO } from "./DTOs";
import { db } from "./initDatabase";
import { getAllTracks } from "./tracksCRUD";

export async function addCollection(collection: CollectionDTO) {
  const safeCollection: CollectionDTO = {
    collection_id: collection.collection_id ?? crypto.randomUUID(),
    title: collection.title ?? "Untitled",
    description: collection.description ?? "",
    cover: collection.cover ?? null,
    tracks: collection.tracks ?? [],
  };

  await db.add("Collections", collection);
  emitCollectionsUpdated();
}

export async function getCollection(id: string) {
  return await db.get("Collections", id);
}

export async function getAllCollections() {
  return await db.getAll("Collections");
}

export async function updateCollection(collection: CollectionDTO) {
  await db.put("Collections", collection);
  emitCollectionsUpdated();
}

export async function deleteCollection(id: string) {
  await db.delete("Collections", id);
  emitCollectionsUpdated();
}

export function removeTrackFromCollection(collection: CollectionDTO, trackID: string) {
  collection.tracks = collection.tracks.filter(track => track !== trackID);
  emitCollectionsUpdated();
}
