export interface TrackDTO {
  track_id: string;
  title: string;
  artist: string;
  audio: Blob;
  duration: number;
}

export interface CollectionDTO {
  collection_id: string;
  title: string;
  description: string;
  cover: Blob | null;
  tracks: string[];          //track_id
}
