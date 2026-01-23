// User 관련 타입 정의

export interface User {
  user_id: number;
  provider: "GOOGLE" | "KAKAO" | "NAVER";
  nickname: string;
  picture: string;
  email: string;
}
