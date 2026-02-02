"use client";

import EditTimeSlot from "./EditTimeSlot";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TimeSlot } from "@/types/block";
import EditTimeSlotDrawer from "./EditTimeSlotDrawer";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface PlanEditSectionProps {
  dayTimeSlots: TimeSlot[];
}

const PlanEditSection = ({ dayTimeSlots }: PlanEditSectionProps) => {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // 삭제 Dialog 열림 여부
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDrawerForSlot = (slot: TimeSlot, blockId?: string) => {
    setSelectedSlot(slot);
    setSelectedBlockId(
      blockId ?? slot.blocks?.find((b) => b.selected)?.block_id ?? null,
    );
    setDrawerOpen(true);
  };

  const closeDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // 선택된 슬롯이 break인지 여부
  const isBreak = selectedSlot?.type === "FREE";
  const isTimeSlotsEmpty = dayTimeSlots.length === 0;

  // 날짜/시간 수정 핸들러
  const handleDateOrTimeEdit = () => {
    if (!selectedSlot) return;
    // TODO: 날짜/시간 수정 페이지 이동
    setDrawerOpen(false);
  };

  // 후보지 추가 핸들러
  const handleAddCandidate = () => {
    if (!selectedSlot) return;

    router.push(
      `/projects/${projectId}/edit/add-plan/add-candidate/${selectedSlot.time_slot_id}`,
    );
    setDrawerOpen(false);
  };

  // 삭제 Drawer 핸들러
  const handleDelete = () => {
    if (!selectedSlot) return;
    setIsDialogOpen(true);
    setDrawerOpen(false);
  };

  // 삭제 Dialog 핸들러
  const handleDeleteConfirm = () => {
    const slot = selectedSlot;
    if (!slot) return;

    const blocks = slot.blocks ?? [];

    const shouldDeleteSlot =
      slot.type === "FREE" || blocks.length <= 1 || !selectedBlockId;

    if (shouldDeleteSlot) {
      console.log("슬롯 전체 삭제", { slot });
      // TODO: 추후 타임슬롯 삭제(DELETE) API 연동
    } else {
      console.log("블록 1개 삭제", { selectedBlockId });
      // TODO: API 명세에는 타임슬롯 전체 삭제만 나와있지만,
      // 우선 후보지가 있을 경우엔, 해당 후보지만 삭제하도록 구현했습니다.
    }

    setIsDialogOpen(false);
    setSelectedSlot(null);
    setSelectedBlockId(null);
  };

  return (
    <div className="flex flex-col flex-1">
      {isTimeSlotsEmpty ? (
        <p className="text-center flex flex-1 items-center justify-center">
          계획된 일정이 없습니다.
          <br />
          장소를 추가하여 계획을 시작해보세요.
        </p>
      ) : (
        dayTimeSlots.map((slot, index) => {
          const nextSlot = dayTimeSlots[index + 1];
          // endTime === 다음 startTime 이면 숨김
          const hideEndTime = nextSlot && slot.end_time === nextSlot.start_time;

          return (
            <EditTimeSlot
              key={slot.time_slot_id}
              slot={slot}
              hideEndTime={!!hideEndTime}
              defaultOpen={false}
              onOpenOptions={(blockId?: string) =>
                openDrawerForSlot(slot, blockId)
              }
            />
          );
        })
      )}

      <EditTimeSlotDrawer
        open={drawerOpen}
        onOpenChange={closeDrawer}
        onDateOrTimeEdit={handleDateOrTimeEdit}
        onAddCandidate={handleAddCandidate}
        onDelete={handleDelete}
        isBreak={isBreak}
      />

      {/* 삭제 Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="w-[calc(100%-2rem)]">
          <AlertDialogHeader className="text-left">
            <AlertDialogTitle>장소를 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription />
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row items-center justify-center">
            <AlertDialogCancel className="flex-1">아니오</AlertDialogCancel>
            <AlertDialogAction className="flex-1" onClick={handleDeleteConfirm}>
              네
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlanEditSection;
