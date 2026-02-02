"use client";

import { Place } from "@/types/place";
import { ReactionType } from "@/types/reaction";
import { TimeSlot, TimeSlotBlock } from "@/types/block";
import { CommentGroup } from "@/types/comment";
import { ReactionSummary } from "@/types/reaction";
import FreeTimeCard from "./FreeTimeCard";
import PlanCandidatesList from "./PlanCandidatesList";
import PlaceCard from "./PlaceCard";
import CandidateListDrawer from "./CandidateListDrawer";

interface CandidatePlace {
  id: string;
  blockId: string;
  title: string;
  address?: string;
}

interface TimeSlotContentProps {
  slot: TimeSlot;
  selectedBlock?: TimeSlotBlock;
  place?: Place;
  blockCount: number;
  shouldShowCandidates: boolean;
  candidatePlaces: CandidatePlace[];
  otherCandidateNames: string[];
  reactionWithCommentCount: ReactionSummary;
  commentGroups: CommentGroup[];
  confirmedBlockId: string | null;
  isCandidateDrawerOpen: boolean;
  setIsCandidateDrawerOpen: (open: boolean) => void;
  setConfirmedBlockId: (id: string | null) => void;
  onReactionChange: (blockId: string, type: ReactionType) => void;
}

const TimeSlotContent = ({
  slot,
  selectedBlock,
  place,
  blockCount,
  shouldShowCandidates,
  candidatePlaces,
  otherCandidateNames,
  reactionWithCommentCount,
  commentGroups,
  confirmedBlockId,
  isCandidateDrawerOpen,
  setIsCandidateDrawerOpen,
  setConfirmedBlockId,
  onReactionChange,
}: TimeSlotContentProps) => {
  return (
    <>
      {slot.type === "FREE" || blockCount === 0 ? (
        <FreeTimeCard memo={slot.memo} />
      ) : shouldShowCandidates ? (
        <PlanCandidatesList
          candidates={candidatePlaces}
          onConfirm={(candidateId) => setConfirmedBlockId(candidateId)}
        />
      ) : (
        <PlaceCard
          title={selectedBlock?.name ?? ""}
          description={slot.memo || ""}
          imageUrl={place?.photos?.[0]}
          reactions={reactionWithCommentCount}
          commentGroups={commentGroups}
          onConfirmedFooterClick={() => setIsCandidateDrawerOpen(true)}
          onReactionChange={(type) =>
            selectedBlock && onReactionChange(selectedBlock.block_id, type)
          }
          onCommentClick={() => {
          }}
          confirmedFromCandidateCount={blockCount > 1 ? blockCount : undefined}
        />
      )}
      {confirmedBlockId && (
        <CandidateListDrawer
          open={isCandidateDrawerOpen}
          onOpenChange={setIsCandidateDrawerOpen}
          candidates={otherCandidateNames}
        />
      )}
    </>
  );
};

export default TimeSlotContent;
