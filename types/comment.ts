export type CommentMood = "prefer" | "available" | "unavailable";

export interface CommentGroup {
  id: string;
  name: string;
  mood: CommentMood;
  chips: string[];
  directInput?: string;
}
