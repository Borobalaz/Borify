export type CollectionDTO = { 
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  trackIds: string[]; // Array of Track IDs in the collection
}