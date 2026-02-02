import { TimeSlot } from "@/types/block";
import { placeMockData } from "./placeMockData";

export const blockMockData: Record<string, TimeSlot[]> = {
  "plan-001": [
    {
      time_slot_id: "ts-001",
      type: "PLACE",
      day: 1,
      start_time: "09:00",
      end_time: "09:30",
      memo: "풍경이 너무 좋은 거 같아",
      blocks: [
        {
          block_id: "ts-001-block-001",
          place_id: "54",
          name: placeMockData.find((p) => p.place_id === "54")!.name, // 성산일출봉
          selected: true,
        },
      ],
    },
    {
      time_slot_id: "ts-002",
      type: "PLACE",
      day: 1,
      start_time: "09:30",
      end_time: "12:00",
      memo: "풍경이 너무 좋은 거 같아",
      blocks: [
        {
          block_id: "ts-002-block-001",
          place_id: "55",
          name: placeMockData.find((p) => p.place_id === "55")!.name, // 협재 해수욕장
          selected: true,
        },
      ],
    },
    {
      time_slot_id: "ts-003",
      type: "PLACE",
      day: 1,
      start_time: "12:00",
      end_time: "17:00",
      memo: "풍경이 너무 좋은 거 같아",
      blocks: [
        {
          block_id: "ts-003-block-001",
          place_id: "54",
          name: placeMockData.find((p) => p.place_id === "54")!.name, // 성산일출봉
          selected: true,
        },
        {
          block_id: "ts-003-block-002",
          place_id: "55",
          name: placeMockData.find((p) => p.place_id === "55")!.name, // 협재 해수욕장
          selected: false,
        },
        {
          block_id: "ts-003-block-003",
          place_id: "58",
          name: placeMockData.find((p) => p.place_id === "58")!.name, // 카멜리아힐
          selected: false,
        },
      ],
    },
    {
      time_slot_id: "ts-004",
      type: "FREE",
      day: 1,
      start_time: "17:00",
      end_time: "18:00",
      memo: "자유시간이다~",
      blocks: [],
    },
    {
      time_slot_id: "ts-005",
      type: "PLACE",
      day: 2,
      start_time: "09:00",
      end_time: "09:30",
      memo: "풍경이 너무 좋은 거 같아",
      blocks: [
        {
          block_id: "ts-005-block-001",
          place_id: "54",
          name: placeMockData.find((p) => p.place_id === "54")!.name, // 성산일출봉
          selected: true,
        },
      ],
    },
    {
      time_slot_id: "ts-006",
      type: "FREE",
      day: 2,
      start_time: "09:30",
      end_time: "12:00",
      memo: "자유시간이다~",
      blocks: [],
    },
    {
      time_slot_id: "ts-007",
      type: "FREE",
      day: 2,
      start_time: "12:00",
      end_time: "17:00",
      memo: "자유",
      blocks: [],
    },
    {
      time_slot_id: "ts-008",
      type: "PLACE",
      day: 2,
      start_time: "17:00",
      end_time: "18:00",
      memo: "풍경이 너무 좋은 거 같아",
      blocks: [
        {
          block_id: "ts-008-block-001",
          place_id: "54",
          name: placeMockData.find((p) => p.place_id === "54")!.name, // 성산일출봉
          selected: true,
        },
        {
          block_id: "ts-008-block-002",
          place_id: "55",
          name: placeMockData.find((p) => p.place_id === "55")!.name, // 협재 해수욕장
          selected: false,
        },
        {
          block_id: "ts-008-block-003",
          place_id: "58",
          name: placeMockData.find((p) => p.place_id === "58")!.name, // 카멜리아힐
          selected: false,
        },
      ],
    },
  ],
};
