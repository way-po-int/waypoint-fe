// Collection 관련 타입 정의

import { Place } from "./place";

export interface CollectionMember {
  collection_member_id: string; // user_id와 동일 (MySQL 외래키 관계)
  nickname: string;
  picture: string;
}

export interface Collection {
  collection_id: string;
  title: string;
  member_count: number;
  places: Place[]; // Collection에 속한 여러 개의 Place
  members: CollectionMember[]; // Collection에 속한 여러 명의 User
}
