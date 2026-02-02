"use client";

import { useMemo, useState } from "react";
import { placeMockData } from "@/mocks/placeMockData";
import { commentMockData } from "@/mocks/commentMockData";
import { TimeSlot } from "@/types/block";
import { ReactionType } from "@/types/reaction";
import PlanTimeSlot from "./PlanTimeSlot";
import ReactionDrawer from "./ReactionDrawer";

interface PlanSectionProps {
  dayTimeSlots: TimeSlot[];
}

const PlanSection = ({ dayTimeSlots }: PlanSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<ReactionType | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [myReactionOverrides, setMyReactionOverrides] = useState<
    Record<string, { reaction: ReactionType; chips: string[]; directInput?: string }>
  >({});
  const [initialChips, setInitialChips] = useState<string[] | undefined>(
    undefined,
  );
  const [initialDirectInput, setInitialDirectInput] = useState<
    string | undefined
  >(undefined);

  const placeMap = useMemo(
    () =>
      placeMockData.reduce<Record<string, (typeof placeMockData)[number]>>(
        (acc, place) => {
          acc[place.place_id] = place;
          return acc;
        },
        {},
      ),
    [],
  );

  const handleReactionSelect = (blockId: string, next: ReactionType) => {
    setSelectedReaction(next);
    setSelectedBlockId(blockId);

    const override = myReactionOverrides[blockId];
    if (override) {
      if (override.reaction === next) {
        setInitialChips(override.chips);
        setInitialDirectInput(override.directInput);
      } else {
        setInitialChips([]);
        setInitialDirectInput(undefined);
      }
    } else {
      const meComment = (commentMockData[blockId] ?? []).find(
        (group) => group.isMe,
      );
      if (meComment?.mood === next) {
        setInitialChips(meComment.chips ?? []);
        setInitialDirectInput(meComment.directInput);
      } else {
        setInitialChips([]);
        setInitialDirectInput(undefined);
      }
    }

    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      {dayTimeSlots.map((slot, index) => {
        const nextSlot = dayTimeSlots[index + 1];
        const hideEndTime =
          (nextSlot && slot.end_time === nextSlot.start_time) ||
          index === dayTimeSlots.length - 1;
        const isLast = index === dayTimeSlots.length - 1;
        const isMiddle = index > 0 && index < dayTimeSlots.length - 1;
        const markerVariant = index === 0 ? "first" : isLast ? "last" : isMiddle ? "middle" : undefined;

        return (
          <PlanTimeSlot
            key={slot.time_slot_id}
            slot={slot}
            hideEndTime={!!hideEndTime}
            placeMap={placeMap}
            onReactionChange={handleReactionSelect}
            markerVariant={markerVariant}
            myReactionOverrides={myReactionOverrides}
          />
        );
      })}

      <ReactionDrawer
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedReaction={selectedReaction}
        onSubmit={({ reaction, chips, directInput }) => {
          if (!selectedBlockId) return;
          setMyReactionOverrides((prev) => ({
            ...prev,
            [selectedBlockId]: { reaction, chips, directInput },
          }));
        }}
        initialChips={initialChips}
        initialDirectInput={initialDirectInput}
      />
    </div>
  );
};

export default PlanSection;
