export interface Place {
  placeName: string;
  placeDescription: string;
  placeAddress: string;
  likeCount: number;
  dislikeCount: number;
}

export interface Collection {
  collectionId: number;
  title: string;
  destination: string;
  memberCount: number;
  thumbnailImageUrl: string;
  places: Place[];
}
