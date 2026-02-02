import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactionGroup from "./ReactionGroup";
import ReactionItem from "./ReactionItem";
import CommentModal from "./CommentModal";
import ReactionDrawer from "./ReactionDrawer";
import { commentMockData } from "@/mocks/commentMockData";
import { ReactionType } from "@/types/reaction";
import {
  Angry,
  Laugh,
  MessageCircle,
  Smile,
  CircleUserRound,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

interface Candidate {
  id: string;
  title: string;
  address?: string;
  authorLabel?: string;
  blockId?: string;
  reactions?: {
    prefer: number;
    available: number;
    unavailable: number;
    myReaction?: ReactionType | null;
  };
  commentCount?: number;
}

interface PlanCandidatesListProps {
  candidates: Candidate[];
  onConfirm?: (candidateId: string) => void;
}

const CandidateCard = ({
  candidate,
  isSelectable,
  isSelected,
  onSelect,
}: {
  candidate: Candidate;
  isSelectable: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<ReactionType | null>(null);
  const [overrideMyReaction, setOverrideMyReaction] =
    useState<ReactionType | null>(null);
  const [overrideChips, setOverrideChips] = useState<string[] | undefined>(
    undefined,
  );
  const [overrideDirectInput, setOverrideDirectInput] = useState<
    string | undefined
  >(undefined);

  const commentGroups = candidate.blockId
    ? commentMockData[candidate.blockId] ?? []
    : [];
  const computedReactions = commentGroups.reduce(
    (acc, group) => {
      acc[group.mood] += 1;
      acc.commentCount += 1;
      if (group.isMe) acc.myReaction = group.mood;
      return acc;
    },
    {
      prefer: 0,
      available: 0,
      unavailable: 0,
      commentCount: 0,
      myReaction: null as ReactionType | null,
    },
  );

  const reactions = candidate.reactions ?? {
    prefer: computedReactions.prefer,
    available: computedReactions.available,
    unavailable: computedReactions.unavailable,
    myReaction: computedReactions.myReaction,
  };
  const effectiveMyReaction =
    overrideMyReaction ?? reactions.myReaction ?? null;

  const adjustedReactions = { ...reactions };
  const baseMyReaction = reactions.myReaction ?? null;
  if (overrideMyReaction && overrideMyReaction !== baseMyReaction) {
    if (baseMyReaction) {
      adjustedReactions[baseMyReaction] = Math.max(
        0,
        adjustedReactions[baseMyReaction] - 1,
      );
    }
    adjustedReactions[overrideMyReaction] += 1;
  }
  const commentCount =
    candidate.commentCount ?? computedReactions.commentCount;
  return (
    <Card
      className={`h-[176px] w-full gap-0 rounded-lg border bg-white p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${
        isSelectable ? "cursor-pointer" : ""
      } ${isSelectable && isSelected ? "border-[#1E293B]" : "border-[#E2E8F0]"}`}
      onClick={() => {
        if (isSelectable) onSelect();
      }}
    >
      <CardHeader className="flex h-[72px] w-full flex-row items-center justify-between gap-3 px-6 py-6">
        <CardTitle className="text-base font-semibold text-[#020618] truncate">
          {candidate.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-slate-800">
          <CircleUserRound className="size-5" strokeWidth={2.4} />
          <span className="text-sm font-semibold">
            {candidate.authorLabel ?? "작성자"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex h-[44px] w-full flex-col gap-2 px-6 pb-6 pt-0">
        {candidate.address && (
          <p className="text-sm text-slate-500 truncate">{candidate.address}</p>
        )}
      </CardContent>
      <div className="flex h-[60px] w-full items-center justify-between px-4 py-[14px]">
        <ReactionGroup onClick={(event) => event.stopPropagation()}>
          <ReactionItem
            label="선호"
            count={adjustedReactions.prefer}
            active={effectiveMyReaction === "prefer"}
            icon={<Laugh className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {
              setSelectedReaction("prefer");
              setIsReactionOpen(true);
            }}
          />
          <ReactionItem
            label="가능"
            count={adjustedReactions.available}
            active={effectiveMyReaction === "available"}
            icon={<Smile className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {
              setSelectedReaction("available");
              setIsReactionOpen(true);
            }}
          />
          <ReactionItem
            label="불가능"
            count={adjustedReactions.unavailable}
            active={effectiveMyReaction === "unavailable"}
            icon={<Angry className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {
              setSelectedReaction("unavailable");
              setIsReactionOpen(true);
            }}
          />
        </ReactionGroup>
        <div
          className="flex h-[32px] items-center gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-slate-700"
          onClick={(event) => {
            event.stopPropagation();
            setIsCommentOpen(true);
          }}
        >
          <MessageCircle className="size-5" strokeWidth={2.4} />
          <span className="text-base font-semibold">{commentCount}</span>
        </div>
      </div>
      <CommentModal
        open={isCommentOpen}
        onOpenChange={setIsCommentOpen}
        groups={commentGroups}
      />
      <ReactionDrawer
        open={isReactionOpen}
        onOpenChange={setIsReactionOpen}
        selectedReaction={selectedReaction}
        initialChips={overrideChips}
        initialDirectInput={overrideDirectInput}
        onSubmit={({ reaction, chips, directInput }) => {
          setOverrideMyReaction(reaction);
          setOverrideChips(chips);
          setOverrideDirectInput(directInput);
        }}
      />
    </Card>
  );
};

const PlanCandidatesList = ({ candidates, onConfirm }: PlanCandidatesListProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );
  return (
    <div
      className={`flex flex-1 flex-col gap-4 rounded-2xl p-4 ${
        isSelecting ? "bg-[#CBD5E1]" : "bg-[#F1F5F9]"
      }`}
    >
      <div className="flex flex-col gap-3">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelectable={isSelecting}
            isSelected={selectedCandidateId === candidate.id}
            onSelect={() => setSelectedCandidateId(candidate.id)}
          />
        ))}
      </div>
      {isSelecting ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => setIsSelecting(false)}
            className="flex h-[24px] w-[24px] items-center justify-center text-slate-700"
          >
            <ArrowLeft className="size-5" strokeWidth={2.4} />
          </button>
          <Button
            variant="outline"
            size="sm"
            disabled={!selectedCandidateId}
            onClick={() => {
              if (!selectedCandidateId) return;
              onConfirm?.(selectedCandidateId);
            }}
            className="h-[32px] flex-1 gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-sm font-medium leading-5 text-center text-[#0F172B] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            해당 장소로 확정하기
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSelecting(true)}
          className="h-[32px] w-full gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-sm font-medium leading-5 text-center text-[#0F172B] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          후보지 선택하기
        </Button>
      )}
    </div>
  );
};

export default PlanCandidatesList;
