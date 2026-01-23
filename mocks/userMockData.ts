import { User } from "@/types/user";

export const userMockData: User[] = [
  {
    user_id: 1,
    provider: "GOOGLE",
    nickname: "여행러버",
    picture: "https://lh3.googleusercontent.com/a/default-user",
    email: "user@example.com",
  },
  {
    user_id: 2,
    provider: "KAKAO",
    nickname: "제주도러버",
    picture: "https://lh3.googleusercontent.com/a/default-user-2",
    email: "jeju@example.com",
  },
  {
    user_id: 3,
    provider: "GOOGLE",
    nickname: "부산탐험가",
    picture: "https://lh3.googleusercontent.com/a/default-user-3",
    email: "busan@example.com",
  },
  {
    user_id: 4,
    provider: "NAVER",
    nickname: "강릉여행자",
    picture: "https://lh3.googleusercontent.com/a/default-user-4",
    email: "gangneung@example.com",
  },
];
