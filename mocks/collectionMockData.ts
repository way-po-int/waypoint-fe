import { Collection } from "@/types/collection";
import { placeMockData } from "./placeMockData";
import { userMockData } from "./userMockData";

export const collectionMockData: Collection[] = [
  {
    collection_id: "col-001",
    title: "제주도 맛집 리스트",
    member_count: 3,
    places: [
      placeMockData.find((p) => p.place_id === "54")!, // 성산일출봉
      placeMockData.find((p) => p.place_id === "55")!, // 협재 해수욕장
      placeMockData.find((p) => p.place_id === "58")!, // 카멜리아힐
    ],
    members: [
      {
        collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
        nickname: userMockData[0].nickname,
        picture: userMockData[0].picture,
      },
      {
        collection_member_id: userMockData[1].user_id.toString(), // 2 - 제주도러버
        nickname: userMockData[1].nickname,
        picture: userMockData[1].picture,
      },
      {
        collection_member_id: userMockData[2].user_id.toString(), // 3 - 부산탐험가
        nickname: userMockData[2].nickname,
        picture: userMockData[2].picture,
      },
    ],
  },
  {
    collection_id: "col-002",
    title: "부산 관광지 모음",
    member_count: 2,
    places: [
      placeMockData.find((p) => p.place_id === "56")!, // 해동용궁사
      placeMockData.find((p) => p.place_id === "59")!, // 감천문화마을
      placeMockData.find((p) => p.place_id === "60")!, // 부산 해운대 해수욕장
    ],
    members: [
      {
        collection_member_id: userMockData[2].user_id.toString(), // 3 - 부산탐험가
        nickname: userMockData[2].nickname,
        picture: userMockData[2].picture,
      },
      {
        collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
        nickname: userMockData[0].nickname,
        picture: userMockData[0].picture,
      },
    ],
  },
  {
    collection_id: "col-003",
    title: "강릉 카페 투어",
    member_count: 4,
    places: [
      placeMockData.find((p) => p.place_id === "57")!, // 안목해변
      placeMockData.find((p) => p.place_id === "61")!, // 정동진 해수욕장
    ],
    members: [
      {
        collection_member_id: userMockData[3].user_id.toString(), // 4 - 강릉여행자
        nickname: userMockData[3].nickname,
        picture: userMockData[3].picture,
      },
      {
        collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
        nickname: userMockData[0].nickname,
        picture: userMockData[0].picture,
      },
      {
        collection_member_id: userMockData[1].user_id.toString(), // 2 - 제주도러버
        nickname: userMockData[1].nickname,
        picture: userMockData[1].picture,
      },
      {
        collection_member_id: userMockData[2].user_id.toString(), // 3 - 부산탐험가
        nickname: userMockData[2].nickname,
        picture: userMockData[2].picture,
      },
    ],
  },
  {
    collection_id: "col-004",
    title: "서울 핫플레이스",
    member_count: 1,
    places: [
      placeMockData.find((p) => p.place_id === "63")!, // 경복궁
      placeMockData.find((p) => p.place_id === "64")!, // 남산타워
    ],
    members: [
      {
        collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
        nickname: userMockData[0].nickname,
        picture: userMockData[0].picture,
      },
    ],
  },
];
