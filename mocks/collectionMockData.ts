import { Collection } from "@/types/collection";

export const collectionMockData: Collection[] = [
  {
    collectionId: 1,
    title: "2026년 제주도 여행지 리스트입니다.",
    destination: "제주도",
    memberCount: 4,
    thumbnailImageUrl: "https://placehold.co/600x300/FFFFFF/FFFFFF.png",
    places: [
      {
        placeName: "성산일출봉",
        placeDescription: "유네스코 세계자연유산으로 지정된 화산체로, 일출 명소로 유명합니다.",
        placeAddress: "제주특별자치도 서귀포시 성산읍 성산리",
        likeCount: 124,
        dislikeCount: 8,
      },
      {
        placeName: "카멜리아힐",
        placeDescription: "세계적인 동백나무 식물원으로 사계절 다양한 꽃을 감상할 수 있습니다.",
        placeAddress: "제주특별자치도 서귀포시 안덕면 병악로 166",
        likeCount: 89,
        dislikeCount: 5,
      },
      {
        placeName: "협재 해수욕장",
        placeDescription: "에메랄드 빛 바다와 하얀 모래사장이 아름다운 해수욕장입니다.",
        placeAddress: "제주특별자치도 제주시 한림면 협재리",
        likeCount: 156,
        dislikeCount: 12,
      },
    ],
  },
  {
    collectionId: 2,
    title: "부산 여행지 리스트",
    destination: "부산",
    memberCount: 2,
    thumbnailImageUrl: "https://placehold.co/600x300/FFFFFF/FFFFFF.png",
    places: [
      {
        placeName: "해동용궁사",
        placeDescription: "바다 위에 지어진 절로, 바다와 산의 조화가 아름다운 곳입니다.",
        placeAddress: "부산광역시 기장군 기장읍 용궁길 86",
        likeCount: 98,
        dislikeCount: 3,
      },
      {
        placeName: "감천문화마을",
        placeDescription: "산자락을 따라 빼곡히 들어선 집들이 마치 산타마을을 연상시키는 문화마을입니다.",
        placeAddress: "부산광역시 사하구 감내2로 203",
        likeCount: 142,
        dislikeCount: 15,
      },
      {
        placeName: "부산 해운대 해수욕장",
        placeDescription: "부산을 대표하는 해수욕장으로 다양한 이벤트와 축제가 열리는 곳입니다.",
        placeAddress: "부산광역시 해운대구 해운대해변로 264",
        likeCount: 203,
        dislikeCount: 18,
      },
      {
        placeName: "자갈치시장",
        placeDescription: "부산 최대의 수산물 전문 시장으로 신선한 해산물을 구입할 수 있습니다.",
        placeAddress: "부산광역시 중구 자갈치해안로 52",
        likeCount: 167,
        dislikeCount: 22,
      },
    ],
  },
  {
    collectionId: 3,
    title: "강릉 여행지 리스트",
    destination: "강릉",
    memberCount: 3,
    thumbnailImageUrl: "https://placehold.co/600x300/FFFFFF/FFFFFF.png",
    places: [
      {
        placeName: "안목해변",
        placeDescription: "강릉의 대표적인 해변으로 커피거리와 함께 즐길 수 있는 곳입니다.",
        placeAddress: "강원특별자치도 강릉시 창해로14번길 20-1",
        likeCount: 134,
        dislikeCount: 7,
      },
      {
        placeName: "정동진 해수욕장",
        placeDescription: "동해에서 가장 빨리 해가 뜨는 곳으로 일출 명소입니다.",
        placeAddress: "강원특별자치도 강릉시 강동면 정동진리",
        likeCount: 178,
        dislikeCount: 11,
      },
      {
        placeName: "하슬라아트월드",
        placeDescription: "자연과 예술이 만나는 공간으로 다양한 미술 작품을 감상할 수 있습니다.",
        placeAddress: "강원특별자치도 강릉시 강동면 율곡로 1441",
        likeCount: 95,
        dislikeCount: 9,
      },
    ],
  },
];
