"use client";

import Divider from "@/components/common/Divider";
import SourceSection from "@/components/common/SourceSection";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { collectionMockData } from "@/mocks/collectionMockData";
import {
  CheckIcon,
  CopyIcon,
  MapPinIcon,
  PencilIcon,
  TimerIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PlaceDetailPage = () => {
  const params = useParams();
  const collectionId = params.id as string;
  const placeId = params.placeId as string;
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memo, setMemo] = useState("");

  const collection = collectionMockData.find(
    (c) => c.collection_id === collectionId
  );
  const collectionPlace =
    collection?.places.find((cp) => cp.collection_place_id === placeId) ?? null;
  const place = collectionPlace?.place ?? null;

  // 메모 초기값 설정
  useEffect(() => {
    if (collectionPlace?.memo) {
      setMemo(collectionPlace.memo);
    }
  }, [collectionPlace?.memo]);

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

  const handleEditMemo = () => {
    setIsEditingMemo(true);
  };

  const handleSaveMemo = () => {
    // TODO: 실제 API 호출로 메모 저장
    setIsEditingMemo(false);
    toast.success("메모가 저장되었습니다");
  };

  return (
    <div className="w-full min-h-screen">
      <Header
        showBackButton
        showNotificationButton
        className="fixed top-0 z-10 inset-x-0"
      />
      <main className="flex flex-col gap-6 mt-17 mx-5">
        {/* 사진 */}
        <div className="bg-gray-300 w-full h-50" />
        {/* 정보 + 메모 */}
        <div className="flex flex-col gap-8">
          {/* 정보 */}
          <div className="flex flex-col gap-4">
            <Label className="text-lg font-bold">{place?.name}</Label>
            <div className="flex flex-col gap-3.5">
              <Divider />
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
            </div>
          </div>
          {/* 메모 */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <Label className="font-bold">메모</Label>
              {isEditingMemo ? (
                <Button variant="ghost" onClick={handleSaveMemo}>
                  <CheckIcon className="size-6" />
                </Button>
              ) : (
                <Button variant="ghost" onClick={handleEditMemo}>
                  <PencilIcon className="size-6" />
                </Button>
              )}
            </div>
            {isEditingMemo ? (
              <Textarea
                placeholder="메모를 입력하세요"
                className="resize-none h-20 text-sm"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            ) : (
              <p className="text-sm min-h-[80px] whitespace-pre-wrap">
                {memo || "메모가 없습니다"}
              </p>
            )}
          </div>
        </div>
        {/* 맵 및 출처*/}
        <div className="flex flex-col gap-5">
          {/* 구글 맵이 들어갈 자리 */}
          <div className="w-full h-57 bg-gray-300 rounded-[12px]" />
          {/* 출처 */}
          <SourceSection source={place?.google_maps_uri} />
        </div>
      </main>
    </div>
  );
};

export default PlaceDetailPage;
