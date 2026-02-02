"use client";

import { Place } from "@/types/place";
import { ReactionType } from "@/types/reaction";
import { TimeSlot } from "@/types/block";
import TimelineHeader from "./TimelineHeader";
import TimeSlotContent from "./TimeSlotContent";
import { commentMockData } from "@/mocks/commentMockData";
import { useState } from "react";

interface PlanTimeSlotProps {
  slot: TimeSlot;
  placeMap: Record<string, Place>;
  onReactionChange: (blockId: string, type: ReactionType) => void;
  markerVariant?: "first" | "middle" | "last";
  myReactionOverrides?: Record<
    string,
    { reaction: ReactionType; chips: string[]; directInput?: string }
  >;
}

const PlanTimeSlot = ({
  slot,
  placeMap,
  onReactionChange,
  markerVariant,
  myReactionOverrides,
}: PlanTimeSlotProps) => {
  const [confirmedBlockId, setConfirmedBlockId] = useState<string | null>(null);
  const [isCandidateDrawerOpen, setIsCandidateDrawerOpen] = useState(false);
  const blocks = slot.blocks ?? [];
  const blockCount = blocks.length;
  const hasSelected = blocks.some((block) => block.selected);
  const selectedBlock =
    blocks.find((block) => block.block_id === confirmedBlockId) ??
    blocks.find((block) => block.selected) ??
    blocks[0];

  const shouldShowCandidates =
    slot.type === "PLACE" &&
    blockCount > 1 &&
    !hasSelected &&
    !confirmedBlockId;

  const candidatePlaces = blocks.map((block) => {
    const place = block.place_id ? placeMap[block.place_id] : undefined;
    return {
      id: block.block_id,
      blockId: block.block_id,
      title: block.name,
      address: place?.address,
    };
  });
  const otherCandidateNames = blocks
    .filter((block) => block.block_id !== confirmedBlockId)
    .map((block) => block.name);

  const place = selectedBlock?.place_id
    ? placeMap[selectedBlock.place_id]
    : undefined;

  const commentGroups = selectedBlock?.block_id
    ? commentMockData[selectedBlock.block_id] ?? []
    : [];
  const baseCounts = commentGroups.reduce(
    (acc, group) => {
      acc[group.mood] += 1;
      return acc;
    },
    {
      prefer: 0,
      available: 0,
      unavailable: 0,
    },
  );
  const baseMyReaction = commentGroups.find((group) => group.isMe)?.mood ?? null;
  const overrideMyReaction =
    (selectedBlock?.block_id &&
      myReactionOverrides?.[selectedBlock.block_id]?.reaction) ??
    null;

  const reactionWithCommentCount = {
    ...baseCounts,
    commentCount: commentGroups.length,
    myReaction: overrideMyReaction ?? baseMyReaction,
  };

  if (overrideMyReaction && overrideMyReaction !== baseMyReaction) {
    if (baseMyReaction) {
      reactionWithCommentCount[baseMyReaction] = Math.max(
        0,
        reactionWithCommentCount[baseMyReaction] - 1,
      );
    }
    reactionWithCommentCount[overrideMyReaction] += 1;
  }

  const placeTitle = place?.address ?? "";
  const candidatesTitle = `${blockCount}개의 후보지가 있어요!`;

  const titleText =
    slot.type === "FREE" || blockCount === 0
      ? null
      : shouldShowCandidates
        ? candidatesTitle
        : placeTitle || null;

  const showConnectorLine = markerVariant !== "last";

  return (
    <div className="flex w-full flex-col">
      <TimelineHeader
        startTime={slot.start_time}
        markerVariant={markerVariant}
        title={titleText}
      />

      <div className="flex gap-[16px]">
        <div className="flex w-[7px] flex-col items-center">
          {showConnectorLine && (
            <div className="w-px flex-1 bg-[#D9D9D9]" />
          )}
        </div>

        <div className="flex-1">
          <TimeSlotContent
            slot={slot}
            selectedBlock={selectedBlock}
            place={place}
            blockCount={blockCount}
            shouldShowCandidates={shouldShowCandidates}
            candidatePlaces={candidatePlaces}
            otherCandidateNames={otherCandidateNames}
            reactionWithCommentCount={reactionWithCommentCount}
            commentGroups={commentGroups}
            confirmedBlockId={confirmedBlockId}
            isCandidateDrawerOpen={isCandidateDrawerOpen}
            setIsCandidateDrawerOpen={setIsCandidateDrawerOpen}
            setConfirmedBlockId={setConfirmedBlockId}
            onReactionChange={onReactionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanTimeSlot;
