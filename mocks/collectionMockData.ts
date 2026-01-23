import { Collection } from "@/types/collection";
import { placeMockData } from "./placeMockData";
import { userMockData } from "./userMockData";

export const collectionMockData: Collection[] = [
  {
    collection_id: "col-001",
    title: "제주도 맛집 리스트",
    member_count: 3,
    places: [
      {
        collection_place_id: "cp-001",
        memo: "일출 보기 좋은 곳! 아침 일찍 가야 함",
        place: placeMockData.find((p) => p.place_id === "54")!, // 성산일출봉
        picked_member: [
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
        ],
        passed_member: [
          {
            collection_member_id: userMockData[2].user_id.toString(), // 3 - 부산탐험가
            nickname: userMockData[2].nickname,
            picture: userMockData[2].picture,
          },
        ],
        like_count: 2,
        dislike_count: 1,
      },
      {
        collection_place_id: "cp-002",
        memo: "에메랄드 빛 바다가 정말 아름다워요",
        place: placeMockData.find((p) => p.place_id === "55")!, // 협재 해수욕장
        picked_member: [
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
        passed_member: [],
        like_count: 3,
        dislike_count: 0,
      },
      {
        collection_place_id: "cp-003",
        memo: "세계적인 동백나무 식물원으로 사계절 다양한 꽃을 감상할 수 있습니다",
        place: placeMockData.find((p) => p.place_id === "58")!, // 카멜리아힐
        picked_member: [
          {
            collection_member_id: userMockData[1].user_id.toString(), // 2 - 제주도러버
            nickname: userMockData[1].nickname,
            picture: userMockData[1].picture,
          },
        ],
        passed_member: [],
        like_count: 1,
        dislike_count: 0,
      },
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
      {
        collection_place_id: "cp-004",
        memo: "바다 위 절, 사진 찍기 좋은 곳",
        place: placeMockData.find((p) => p.place_id === "56")!, // 해동용궁사
        picked_member: [
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
        passed_member: [],
        like_count: 2,
        dislike_count: 0,
      },
      {
        collection_place_id: "cp-005",
        memo: "산자락을 따라 빼곡히 들어선 집들이 마치 산타마을을 연상시키는 문화마을",
        place: placeMockData.find((p) => p.place_id === "59")!, // 감천문화마을
        picked_member: [
          {
            collection_member_id: userMockData[2].user_id.toString(), // 3 - 부산탐험가
            nickname: userMockData[2].nickname,
            picture: userMockData[2].picture,
          },
        ],
        passed_member: [
          {
            collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
            nickname: userMockData[0].nickname,
            picture: userMockData[0].picture,
          },
        ],
        like_count: 1,
        dislike_count: 1,
      },
      {
        collection_place_id: "cp-006",
        memo: "부산을 대표하는 해수욕장으로 다양한 이벤트와 축제가 열리는 곳",
        place: placeMockData.find((p) => p.place_id === "60")!, // 부산 해운대 해수욕장
        picked_member: [
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
        passed_member: [],
        like_count: 2,
        dislike_count: 0,
      },
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
      {
        collection_place_id: "cp-007",
        memo: "커피 맛집이 많은 해변",
        place: placeMockData.find((p) => p.place_id === "57")!, // 안목해변
        picked_member: [
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
        ],
        passed_member: [],
        like_count: 2,
        dislike_count: 0,
      },
      {
        collection_place_id: "cp-008",
        memo: "동해에서 가장 빨리 해가 뜨는 곳으로 일출 명소",
        place: placeMockData.find((p) => p.place_id === "61")!, // 정동진 해수욕장
        picked_member: [
          {
            collection_member_id: userMockData[3].user_id.toString(), // 4 - 강릉여행자
            nickname: userMockData[3].nickname,
            picture: userMockData[3].picture,
          },
          {
            collection_member_id: userMockData[1].user_id.toString(), // 2 - 제주도러버
            nickname: userMockData[1].nickname,
            picture: userMockData[1].picture,
          },
          {
            collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
            nickname: userMockData[0].nickname,
            picture: userMockData[0].picture,
          },
        ],
        passed_member: [],
        like_count: 3,
        dislike_count: 0,
      },
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
      {
        collection_place_id: "cp-009",
        memo: "조선 왕조 제1의 법궁으로 태조 4년에 건립된 궁궐",
        place: placeMockData.find((p) => p.place_id === "63")!, // 경복궁
        picked_member: [
          {
            collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
            nickname: userMockData[0].nickname,
            picture: userMockData[0].picture,
          },
        ],
        passed_member: [],
        like_count: 1,
        dislike_count: 0,
      },
      {
        collection_place_id: "cp-010",
        memo: "서울의 랜드마크인 남산타워에서 서울 전경을 감상할 수 있습니다",
        place: placeMockData.find((p) => p.place_id === "64")!, // 남산타워
        picked_member: [
          {
            collection_member_id: userMockData[0].user_id.toString(), // 1 - 여행러버
            nickname: userMockData[0].nickname,
            picture: userMockData[0].picture,
          },
        ],
        passed_member: [],
        like_count: 1,
        dislike_count: 0,
      },
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
