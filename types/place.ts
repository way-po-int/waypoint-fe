// Place 관련 타입 정의

export interface Point {
  latitude: string;
  longitude: string;
}

export interface Place {
  place_id: string;
  google_place_id: string;
  name: string;
  address: string;
  category: string;
  google_maps_uri: string;
  photos: string[];
  point: Point;
}
