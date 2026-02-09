export type ReactionType = "prefer" | "available" | "unavailable";

export interface ReactionSummary {
  prefer: number;
  available: number;
  unavailable: number;
  commentCount: number;
  myReaction?: ReactionType | null;
}
