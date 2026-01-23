import { Plan } from "@/types/plan";
import { collectionMockData } from "./collectionMockData";

export const planMockData: Plan[] = [
  {
    plan_id: "plan-001",
    title: "제주도 겨울 여행",
    start_date: "2026-01-04",
    end_date: "2026-01-08",
    member_count: 3,
    collections: [
      collectionMockData[0], // 제주도 맛집 리스트
    ],
  },
  {
    plan_id: "plan-002",
    title: "부산 여름 휴가",
    start_date: "2026-07-15",
    end_date: "2026-07-18",
    member_count: 2,
    collections: [
      collectionMockData[1], // 부산 관광지 모음
    ],
  },
  {
    plan_id: "plan-003",
    title: "강릉 가을 여행",
    start_date: "2026-10-01",
    end_date: "2026-10-03",
    member_count: 4,
    collections: [
      collectionMockData[2], // 강릉 카페 투어
    ],
  },
  {
    plan_id: "plan-004",
    title: "서울 봄 나들이",
    start_date: "2026-04-10",
    end_date: "2026-04-12",
    member_count: 1,
    collections: [
      collectionMockData[3], // 서울 핫플레이스
    ],
  },
];
