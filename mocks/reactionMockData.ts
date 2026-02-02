import { ReactionSummary } from "@/types/reaction";

export const reactionMockData: Record<string, ReactionSummary> = {
  "ts-001-block-001": {
    prefer: 3,
    available: 3,
    unavailable: 3,
    commentCount: 9,
    myReaction: "prefer",
  },
  "ts-002-block-001": {
    prefer: 0,
    available: 0,
    unavailable: 0,
    commentCount: 0,
    myReaction: null,
  },
  "ts-003-block-001": {
    prefer: 2,
    available: 1,
    unavailable: 0,
    commentCount: 4,
    myReaction: "available",
  },
  "ts-005-block-001": {
    prefer: 1,
    available: 0,
    unavailable: 0,
    commentCount: 2,
    myReaction: null,
  },
  "ts-008-block-001": {
    prefer: 4,
    available: 3,
    unavailable: 1,
    commentCount: 6,
    myReaction: "prefer",
  },
};
