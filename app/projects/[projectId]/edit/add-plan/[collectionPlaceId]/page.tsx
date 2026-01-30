"use client";

import BottomFixedButton from "@/components/common/BottomFixedButton";
import Divider from "@/components/common/Divider";
import Header from "@/components/layout/Header";
import MemoEditSection from "@/components/projects/plan/MemoEditSection";
import SocialMediaSection from "@/components/projects/plan/SocialMediaSection";
import TimeSlotForm from "@/components/projects/plan/TimeSlotForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { planMockData } from "@/mocks/planMockData";
import { getTotalTripDays } from "@/utils/date";
import { isEndAfterStart } from "@/utils/time";
import { CopyIcon, MapPinIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const AddPlanPlacePage = () => {
  const router = useRouter();
  const params = useParams<{ projectId: string; collectionPlaceId: string }>();
  const { projectId, collectionPlaceId } = params;

  const targetPlan = useMemo(
    () => planMockData.find((p) => p.plan_id === projectId) ?? null,
    [projectId],
  );
  const targetCollectionPlace = useMemo(() => {
    if (!targetPlan) return null;
    for (const collection of targetPlan.collections) {
      const found = collection.places.find(
        (cp) => cp.collection_place_id === collectionPlaceId,
      );
      if (found) return found;
    }
    return null;
  }, [targetPlan, collectionPlaceId]);
  const place = targetCollectionPlace?.place;

  const totalTripDays = useMemo(() => {
    if (!targetPlan) return 0;
    return getTotalTripDays(targetPlan.start_date, targetPlan.end_date);
  }, [targetPlan]);

  // 장소 플랜 폼 상태
  const [placeForm, setPlaceForm] = useState({
    day: "",
    start_time: "",
    end_time: "",
    memo: targetCollectionPlace?.memo ?? "",
  });

  // 편집 중인 값
  const [draftMemo, setDraftMemo] = useState<string>(
    targetCollectionPlace?.memo ?? "",
  );
  const [isEditing, setIsEditing] = useState(false);

  const dayNum = Number(placeForm.day);
  const isDayValid =
    placeForm.day.trim() !== "" && dayNum >= 1 && dayNum <= totalTripDays;
  const isTimeValid =
    placeForm.start_time.trim() !== "" &&
    placeForm.end_time.trim() !== "" &&
    isEndAfterStart(placeForm.start_time, placeForm.end_time);
  const isMemoValid = placeForm.memo.trim().length > 0;

  const isConfirmDisabled =
    !(isDayValid && isTimeValid && isMemoValid) || isEditing;

  // 메모 편집 시작
  const handleStartEdit = () => {
    setDraftMemo(placeForm.memo);
    setIsEditing(true);
  };

  // 메모 편집 끝
  const handleFinishEdit = () => {
    setPlaceForm((prev) => ({ ...prev, memo: draftMemo }));
    setIsEditing(false);

    // TODO: 추후 메모 수정 API 연동
    console.log("메모 수정:", {
      projectId,
      collectionPlaceId,
      memo: draftMemo,
    });
  };

  const handleCopyPlaceAddress = async () => {
    if (!place?.address || place.address.trim().length === 0) {
      toast("장소 주소가 없습니다.");
      return;
    }
    try {
      await navigator.clipboard.writeText(place.address);
      toast.success("장소 주소가 복사되었습니다");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      toast.error("복사에 실패했습니다");
    }
  };

  const handleConfirm = () => {
    // TODO: 추후 컬렉션 장소를 플랜에 추가(POST) API 연동
    console.log(collectionPlaceId, placeForm);
    router.push(`/projects/${projectId}/edit`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        variant="center"
        title={place?.name}
        showBackButton
        showNotificationButton
        className="fixed top-0 z-10 inset-x-0"
      />
      <main className="flex flex-col p-4 mt-16 gap-6 mb-20">
        <AspectRatio ratio={2 / 1} className="relative">
          {/* TODO: 추후 photos로 src 변경 */}
          <Image
            src={"https://placehold.co/600x300/F0F0F0/F0F0F0.png"}
            alt={place?.name ?? "장소 이미지"}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
        <div className="flex flex-col gap-4">
          {/* 장소명 */}
          <h2 className="text-lg font-bold whitespace-pre-wrap wrap-break-word">
            {place?.name}
          </h2>
          {/* 타임슬롯 입력 폼 */}
          <TimeSlotForm values={placeForm} onChange={setPlaceForm} />
          <Divider />
          {/* 주소 + 영업시간 */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-500">관광지</p>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center min-w-0 flex-1">
                <MapPinIcon className="size-6 shrink-0" />
                <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {place?.address}
                </p>
              </div>
              <Button variant="ghost" onClick={handleCopyPlaceAddress}>
                <CopyIcon className="size-6" />
              </Button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <TimerIcon className="size-6" />
              <p className="text-sm">연중 무휴</p>
            </div>
          </div>
          <Divider />
          {/* 메모 편집 */}
          <MemoEditSection
            memo={placeForm.memo}
            draftMemo={draftMemo}
            isEditing={isEditing}
            onStartEdit={handleStartEdit}
            onFinishEdit={handleFinishEdit}
            onChangeDraft={setDraftMemo}
          />
          {/* TODO: 추후 맵 및 출처 연동*/}
          <div className="flex flex-col gap-5">
            {/* 구글 맵이 들어갈 자리 */}
            <div className="w-full h-57 bg-gray-300 rounded-2xl" />
            {/* 출처 */}
            <SocialMediaSection />
          </div>
        </div>
      </main>
      <BottomFixedButton onClick={handleConfirm} disabled={isConfirmDisabled}>
        완료
      </BottomFixedButton>
    </div>
  );
};

export default AddPlanPlacePage;
