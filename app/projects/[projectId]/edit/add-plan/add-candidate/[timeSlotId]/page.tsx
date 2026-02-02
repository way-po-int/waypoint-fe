"use client";

import PlaceCard from "@/components/collection/detailpage/PlaceCard";
import BottomFixedButton from "@/components/common/BottomFixedButton";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { blockMockData } from "@/mocks/blockMockData";
import { planMockData } from "@/mocks/planMockData";
import { Collection } from "@/types/collection";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CollectionId = Collection["collection_id"];

const AddCandidatePage = () => {
  const router = useRouter();
  const { projectId, timeSlotId } = useParams<{
    projectId: string;
    timeSlotId: string;
  }>();

  // 선택된 컬렉션 / 장소 상태
  const [selectedCollectionId, setSelectedCollectionId] =
    useState<CollectionId | null>(null);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);

  // 장소 선택 토글
  const togglePlace = (id: string) =>
    setSelectedPlaceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  // 컬렉션 + 후보 장소 계산 (타임슬롯에 이미 있는 장소는 제외)
  const { collections, selectedId, candidatePlaces } = useMemo(() => {
    const plan = planMockData.find((p) => p.plan_id === projectId) ?? null;
    const collections = plan?.collections ?? [];

    const selectedId =
      selectedCollectionId ?? collections[0]?.collection_id ?? null;

    const places =
      collections.find((c) => c.collection_id === selectedId)?.places ?? [];

    const slot =
      (blockMockData[projectId] ?? []).find(
        (s) => s.time_slot_id === timeSlotId,
      ) ?? null;

    const already = new Set((slot?.blocks ?? []).map((b) => b.place_id));

    return {
      collections,
      selectedId,
      candidatePlaces: places.filter((p) => !already.has(p.place.place_id)),
    };
  }, [projectId, timeSlotId, selectedCollectionId]);

  // 플랜에 연결된 컬렉션이 존재하는지 확인
  const isCollectionExists = collections.length > 0;

  // 컬렉션 변경 시 선택 초기화
  const handleSelectCollection = (id: CollectionId) => {
    if (id === selectedId) return;

    setSelectedCollectionId(id);
    setSelectedPlaceIds([]);
  };

  // 새로운 장소 추가 핸들러
  const handleAddNewPlace = () => {
    if (!selectedId) return;
    // 새로운 장소 추가 페이지로 이동
    router.push(`/collection/${selectedId}/add-place`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더: 뒤로가기 + 닫기 버튼 */}
      <Header
        variant="left"
        showBackButton
        showCloseButton
        className="fixed top-0 z-10 inset-x-0 bg-white"
      />

      <main className="flex flex-1 flex-col p-4 mt-10 mb-20">
        {/* 컬렉션 리스트 */}
        <div className="py-3 flex gap-2 overflow-x-auto bg-white [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {collections.map((c) => {
            const isActive = c.collection_id === selectedId;

            return (
              <Badge
                key={c.collection_id}
                variant={isActive ? "default" : "outline"}
                className="font-semibold"
                asChild
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleSelectCollection(c.collection_id)}
                >
                  {c.title}
                </button>
              </Badge>
            );
          })}
        </div>
        {/* 후보 장소 리스트 */}
        <div className="flex flex-col gap-3">
          {candidatePlaces.map((p) => (
            <div
              key={p.collection_place_id}
              className="flex items-start gap-3"
              onClickCapture={(e) => e.preventDefault()} // 카드 링크 이동 차단
              onClick={() => togglePlace(p.collection_place_id)} // 카드 클릭 = 선택
            >
              <Checkbox
                className="shrink-0"
                id={`place-checkbox-${p.collection_place_id}`}
                checked={selectedPlaceIds.includes(p.collection_place_id)}
                onCheckedChange={() => togglePlace(p.collection_place_id)}
                onClick={(e) => e.stopPropagation()} // 더블 토글 방지
              />
              <div className="flex-1 min-w-0">
                <PlaceCard
                  collectionPlace={p}
                  href={`/projects/${projectId}/edit/add-plan/${p.collection_place_id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <BottomFixedButton
        onClick={handleAddNewPlace}
        showShadow
        disabled={!isCollectionExists}
      >
        새로운 장소를 플랜에 추가하기
      </BottomFixedButton>
    </div>
  );
};

export default AddCandidatePage;
