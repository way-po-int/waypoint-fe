// User 관련 타입 정의

export interface User {
  user_id: string;
  provider: "GOOGLE" | "KAKAO" | "NAVER";
  nickname: string;
  picture: string;
  email: string;
}
