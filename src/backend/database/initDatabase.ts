import { openDB, DBSchema, IDBPDatabase } from "idb";
import { CollectionDTO, TrackDTO } from "./DTOs";

export interface UserDB extends DBSchema {
  Tracks: {
    key: string;             // track_id
    value: TrackDTO;
    indexes: { title: string; artist: string };
  };
  Collections: {
    key: string;             // collection_id
    value: CollectionDTO;
    indexes: { title: string };
  };
}

export let db: IDBPDatabase<UserDB>;

export async function initDB() {
  db = await openDB<UserDB>("UsersDB", 1, {
    upgrade(db) {
      // TRACKS STORE
      if (!db.objectStoreNames.contains("Tracks")) {
        const store = db.createObjectStore("Tracks", {
          keyPath: "track_id"
        });
        store.createIndex("title", "title");
        store.createIndex("artist", "artist");
      }

      // COLLECTIONS STORE
      if (!db.objectStoreNames.contains("Collections")) {
        const store = db.createObjectStore("Collections", {
          keyPath: "collection_id"
        });
        store.createIndex("title", "title");
      }
    },
  });

  return db;
}
