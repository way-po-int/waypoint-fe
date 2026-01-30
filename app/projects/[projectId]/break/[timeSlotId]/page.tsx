"use client";

import Divider from "@/components/common/Divider";
import Header from "@/components/layout/Header";
import MemoEditSection from "@/components/projects/plan/MemoEditSection";
import { Label } from "@/components/ui/label";
import { blockMockData } from "@/mocks/blockMockData";
import { Timer } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const BreakDetailPage = () => {
  const params = useParams<{ projectId: string; timeSlotId: string }>();
  const { projectId, timeSlotId } = params;

  const targetTimeSlot = useMemo(() => {
    const timeSlots = blockMockData[projectId] ?? [];
    return timeSlots.find((slot) => slot.time_slot_id === timeSlotId);
  }, [projectId, timeSlotId]);

  const [memo, setMemo] = useState<string>(targetTimeSlot?.memo ?? "");
  // 편집 중인 값
  const [draftMemo, setDraftMemo] = useState<string>(memo);
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEdit = () => {
    setDraftMemo(memo);
    setIsEditing(true);
  };

  const handleFinishEdit = () => {
    setMemo(draftMemo);
    setIsEditing(false);

    // TODO: 추후 메모 수정 API 연동
    console.log("메모 수정:", { projectId, timeSlotId, memo: draftMemo });
  };

  if (!targetTimeSlot) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더: 뒤로가기 + 타이틀 + 알람 */}
      <Header
        variant="center"
        title="자유 시간"
        showBackButton
        showNotificationButton
        className="fixed top-0 z-15 inset-x-0"
      />

      <main className="flex flex-1 flex-col mt-16 p-4 gap-4">
        {/* 제목 */}
        <h2 className="text-lg font-bold mb-3">자유 시간</h2>
        {/* 메모 편집 */}
        <MemoEditSection
          memo={memo}
          draftMemo={draftMemo}
          isEditing={isEditing}
          onStartEdit={handleStartEdit}
          onFinishEdit={handleFinishEdit}
          onChangeDraft={setDraftMemo}
        />
        <Divider />
        {/* 시간 */}
        <div className="flex flex-col gap-2.5">
          <Label className="text-sm text-gray-500 font-bold">시간</Label>
          <div className="flex items-center gap-2">
            <Timer className="size-6" />
            <p className="text-sm font-medium">
              {targetTimeSlot?.start_time}-{targetTimeSlot?.end_time}
            </p>
          </div>
          <Divider className="mt-1.5" />
        </div>
      </main>
    </div>
  );
};

export default BreakDetailPage;
