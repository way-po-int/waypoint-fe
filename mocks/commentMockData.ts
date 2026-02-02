import { CommentGroup } from "@/types/comment";

export const commentMockData: Record<string, CommentGroup[]> = {
  "ts-001-block-001": [
    {
      id: "c-1",
      name: "공보경",
      mood: "prefer",
      chips: ["현지 분위기를 느낄 수 있어요", "명소로 유명해요"],
      directInput: "저번에 가보니 여기 되게 좋았어!",
    },
    {
      id: "c-2",
      name: "은석기",
      mood: "available",
      chips: ["동선에 벗어나지 않아요", "날씨에 따라 달라요", "한 번은 가보고 싶어요"],
      directInput: "날씨에 따라 달라질 것 같아.",
    },
    {
      id: "c-3",
      name: "이상인",
      mood: "unavailable",
      chips: ["관광지 성격이 저와 맞지 않아요", "체력 소모가 커요", "여행 목적과 맞지 않아요"],
      directInput: "나는 이런 곳 안 좋아해.",
    },
  ],
  "ts-002-block-001": [
    {
      id: "c-4",
      name: "한소연",
      mood: "prefer",
      chips: ["꼭 가보고 싶어요", "사진 찍기 좋아요"],
      directInput: "사진 스팟으로 유명하대!",
    },
  ],
};
