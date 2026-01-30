"use client";

import Divider from "@/components/common/Divider";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blockMockData } from "@/mocks/blockMockData";
import { Check, Pencil, Timer } from "lucide-react";
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

  // 체크 버튼 비활성화 조건
  const isCheckDisabled = draftMemo.trim().length === 0;

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

      <main className="flex flex-1 flex-col mt-20 p-4 gap-4">
        {/* 제목 */}
        <h2 className="text-lg font-bold mb-3">자유 시간</h2>
        {/* 메모 편집 */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-1">
            <Label className="text-base font-bold flex-1">메모</Label>
            <Button
              variant="ghost"
              className="p-0 has-[>svg]:px-0 h-fit"
              onClick={isEditing ? handleFinishEdit : handleStartEdit}
              disabled={isEditing && isCheckDisabled}
              aria-label={isEditing ? "메모 편집 종료" : "메모 편집 시작"}
            >
              {isEditing ? (
                <Check className="size-6" />
              ) : (
                <Pencil className="size-6" />
              )}
            </Button>
          </div>

          <div className="min-h-20">
            {isEditing ? (
              <Textarea
                id="memo"
                value={draftMemo}
                onChange={(e) => setDraftMemo(e.target.value)}
              />
            ) : (
              <span className="text-sm whitespace-pre-wrap wrap-break-word">
                {memo.trim().length > 0 ? memo : "메모가 없습니다"}
              </span>
            )}
          </div>
          <Divider />
        </div>
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
