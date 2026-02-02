"use client";

import { useMemo, useState } from "react";
import { placeMockData } from "@/mocks/placeMockData";
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

  const handleReactionSelect = (_blockId: string, next: ReactionType) => {
    setSelectedReaction(next);
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
          />
        );
      })}

      <ReactionDrawer
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedReaction={selectedReaction}
      />
    </div>
  );
};

export default PlanSection;
