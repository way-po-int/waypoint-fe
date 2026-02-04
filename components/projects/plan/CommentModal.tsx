import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CommentGroup } from "@/types/comment";
import { Laugh, Smile, Angry, X } from "lucide-react";
import { useState } from "react";
import ReactionDrawer from "./ReactionDrawer";
import { ReactionType } from "@/types/reaction";

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommentGroup[];
}

const moodIconMap = {
  prefer: Laugh,
  available: Smile,
  unavailable: Angry,
};

const CommentModal = ({ open, onOpenChange, groups }: CommentModalProps) => {
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<ReactionType | null>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedDirectInput, setSelectedDirectInput] = useState<
    string | undefined
  >(undefined);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[80vh] w-[329px] gap-[4px] overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      >
        <header className="flex h-[40px] items-center justify-end gap-[4px] px-6 py-2">
          <DialogTitle className="sr-only">의견</DialogTitle>
          <button
            type="button"
            aria-label="닫기"
            onPointerDown={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onOpenChange(false);
            }}
            className="flex h-8 w-8 items-center justify-center"
          >
            <X className="size-5" strokeWidth={2.4} />
          </button>
        </header>

        <main className="flex max-h-[calc(80vh-44px)] w-[329px] flex-col gap-[12px] overflow-y-auto px-6 pb-[19px] pt-5">
          <div className="flex w-[281px] flex-col gap-[26px]">
            {groups.map((group) => {
              const Icon = moodIconMap[group.mood];
              return (
                <section
                  key={group.id}
                  className="flex w-[281px] flex-col gap-[12px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Icon
                        className={
                          group.mood === "unavailable"
                            ? "size-6 text-[#EF4444]"
                            : "size-6 text-slate-900"
                        }
                      strokeWidth={2.4}
                    />
                    <span className="text-base font-semibold">
                      {group.name}
                    </span>
                  </div>
                  {group.isMe && (
                    <span className="text-sm font-medium text-slate-500">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReaction(group.mood);
                          setSelectedChips(group.chips ?? []);
                          setSelectedDirectInput(group.directInput);
                          setIsReactionOpen(true);
                          onOpenChange(false);
                        }}
                      >
                        수정하기
                      </button>
                    </span>
                  )}
                </div>
                  <div className="h-px w-full bg-[#D9D9D9]" />
                  <div className="flex flex-wrap gap-[6px]">
                    {group.chips.map((chip) => (
                      <div
                        key={chip}
                        className="rounded-(--radius) border border-[#1E293B] bg-[#E2E8F0] px-3 py-1 text-sm font-semibold text-[#1E293B]"
                      >
                        {chip}
                      </div>
                    ))}
                  </div>
                  {group.directInput && (
                    <div className="rounded-(--radius) bg-slate-100 px-3 py-2 text-sm text-slate-500">
                      {group.directInput}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </main>
      </DialogContent>
      <ReactionDrawer
        open={isReactionOpen}
        onOpenChange={setIsReactionOpen}
        selectedReaction={selectedReaction}
        initialChips={selectedChips}
        initialDirectInput={selectedDirectInput}
      />
    </Dialog>
  );
};

export default CommentModal;
