"use client";

import { CommentGroup } from "@/types/comment";
import { Angry, Laugh, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import ReactionDrawer from "@/components/projects/plan/ReactionDrawer";
import { ReactionType } from "@/types/reaction";

interface CommentSectionProps {
  groups: CommentGroup[];
  onChange?: (groups: CommentGroup[]) => void;
}

const moodIconMap = {
  prefer: Laugh,
  available: Smile,
  unavailable: Angry,
};

const CommentSection = ({ groups, onChange }: CommentSectionProps) => {
  const [localGroups, setLocalGroups] = useState<CommentGroup[]>(groups);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<ReactionType | null>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedDirectInput, setSelectedDirectInput] = useState<
    string | undefined
  >(undefined);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  useEffect(() => {
    setLocalGroups(groups);
  }, [groups]);

  useEffect(() => {
    onChange?.(localGroups);
  }, [localGroups, onChange]);

  return (
    <div className="flex flex-col gap-6">
      {localGroups.map((group, index) => {
        const Icon = moodIconMap[group.mood];
        const isLast = index === localGroups.length - 1;

        return (
          <div key={group.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#020618]">
                <Icon
                  className={
                    group.mood === "unavailable"
                      ? "size-6 text-[#EF4444]"
                      : "size-6 text-[#020618]"
                  }
                  strokeWidth={2.4}
                />
                <span className="text-sm font-semibold">{group.name}</span>
              </div>
              {group.isMe && (
                <button
                  type="button"
                  className="text-sm font-semibold text-slate-600"
                  onClick={() => {
                    setSelectedReaction(group.mood);
                    setSelectedChips(group.chips ?? []);
                    setSelectedDirectInput(group.directInput);
                    setEditingGroupId(group.id);
                    setIsReactionOpen(true);
                  }}
                >
                  수정하기
                </button>
              )}
            </div>

            {!isLast && <div className="h-px w-full bg-[#E2E8F0]" />}

            {group.chips.length > 0 && (
              <div className="flex flex-wrap gap-[10px]">
                {group.chips.map((chip) => (
                  <div
                    key={chip}
                    className="rounded-[12px] border border-[#1E293B] bg-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#1E293B]"
                  >
                    {chip}
                  </div>
                ))}
              </div>
            )}

            {group.directInput && (
              <div className="rounded-[16px] bg-[#F1F5F9] px-4 py-3 text-sm text-slate-600">
                {group.directInput}
              </div>
            )}
          </div>
        );
      })}

      <ReactionDrawer
        open={isReactionOpen}
        onOpenChange={setIsReactionOpen}
        selectedReaction={selectedReaction}
        initialChips={selectedChips}
        initialDirectInput={selectedDirectInput}
        onSubmit={({ reaction, chips, directInput }) => {
          if (!editingGroupId) return;
          setLocalGroups((prev) =>
            prev.map((group) =>
              group.id === editingGroupId
                ? {
                    ...group,
                    mood: reaction,
                    chips,
                    directInput,
                  }
                : group
            )
          );
          setIsReactionOpen(false);
        }}
      />
    </div>
  );
};

export default CommentSection;
