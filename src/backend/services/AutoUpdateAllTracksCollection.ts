import { addCollection, getAllCollections, updateCollection } from "../database/collectionsCRUD";
import { onTracksUpdated } from "../database/databaseEvents";
import { getAllTracks } from "../database/tracksCRUD";

export async function setupAutoUpdateAllTracksCollection() {
  let tracks = await getAllTracks();
  let collections = await getAllCollections();

  let allTracksCollection = collections.find(c => c.title === "All Tracks");

  if (!allTracksCollection) {
    await addCollection({
      collection_id: crypto.randomUUID(),
      title: "All Tracks",
      description: "Contains all tracks",
      cover: null,
      tracks: tracks.map(t => t.track_id),
    });
    return;
  }

  await updateCollection({
    ...allTracksCollection,
    tracks: tracks.map(t => t.track_id),
  });
}
