// Collection 관련 타입 정의

import { Place } from "./place";

export interface CollectionMember {
  collection_member_id: string; // user_id와 동일 (MySQL 외래키 관계)
  nickname: string;
  picture: string;
}

// Collection에 속한 Place (백엔드 스키마 기반)
export interface CollectionPlace {
  collection_place_id: string;
  memo: string;
  place: Place;
  picked_member: CollectionMember[]; // 좋아요를 누른 멤버들
  passed_member: CollectionMember[]; // 싫어요를 누른 멤버들
  like_count: number; // 좋아요 개수
  dislike_count: number; // 싫어요 개수
}

export interface Collection {
  collection_id: string;
  title: string;
  member_count: number;
  places: CollectionPlace[]; // Collection에 속한 여러 개의 Place
  members: CollectionMember[]; // Collection에 속한 여러 명의 User
}
