"use client";

import PlaceCard from "@/components/collection/detailpage/PlaceCard";
import BottomFixedButton from "@/components/common/BottomFixedButton";
import Header from "@/components/layout/Header";
import AddPlanTabs, {
  AddPlanTabValue,
} from "@/components/projects/plan/AddPlanTabs";
import TimeSlotForm from "@/components/projects/plan/TimeSlotForm";
import { Badge } from "@/components/ui/badge";
import { planMockData } from "@/mocks/planMockData";
import { Collection } from "@/types/collection";
import { isEndAfterStart } from "@/utils/time";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

type CollectionId = Collection["collection_id"];

const AddPlanPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams<{ projectId: string }>();

  const projectId = params.projectId;

  const tabParam = searchParams.get("tab");
  const tab: AddPlanTabValue = tabParam === "break" ? "break" : "place";

  const setTab = (next: AddPlanTabValue) => {
    const sp = new URLSearchParams(searchParams.toString());

    if (next === "place") {
      sp.delete("tab");
    } else {
      sp.set("tab", "break");
    }

    const query = sp.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  // TODO: 추후 플랜에 연결된 컬렉션 조회 API 연동
  const targetPlan = planMockData.find((p) => p.plan_id === projectId) ?? null;
  const collections = targetPlan?.collections ?? [];

  const [selectedCollectionId, setSelectedCollectionId] =
    useState<CollectionId | null>(null);

  // TODO: 추후 플랜에 연결된 컬렉션의 장소 조회 API 연동
  const selectedId =
    selectedCollectionId ?? collections[0]?.collection_id ?? null;
  const places =
    collections.find((c) => c.collection_id === selectedId)?.places ?? [];

  // 자유시간 폼 상태
  const [breakForm, setBreakForm] = useState({
    day: "",
    start_time: "",
    end_time: "",
    memo: "",
  });

  // 플랜에 연결된 컬렉션이 존재하는지 확인
  const isCollectionExists = collections.length > 0;

  // 자유시간 폼 모두 작성 완료 했는지 & 시작 시간 < 종료 시간 인지 확인
  const isBreakValid =
    breakForm.day.trim() !== "" &&
    breakForm.start_time.trim() !== "" &&
    breakForm.end_time.trim() !== "" &&
    isEndAfterStart(breakForm.start_time, breakForm.end_time);

  // 새로운 장소 추가 핸들러
  const handleAddNewPlace = () => {
    if (!selectedId) return;

    // 새로운 장소 추가 페이지로 이동
    router.push(`/collection/${selectedId}/add-place`);
  };

  // 자유시간 추가 핸들러
  const handleAddBreak = () => {
    if (!isBreakValid) return;

    // TODO: 추후 API 연동
    console.log("자유시간 추가:", breakForm);

    // 편집모드 페이지로 이동
    router.push(`/projects/${projectId}/edit`);
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

      {/* 탭 메뉴 */}
      <AddPlanTabs value={tab} onValueChange={setTab} className="pb-3" />

      {tab === "place" ? (
        // 플랜에 장소 추가하기
        <main className="flex flex-col p-4 mt-20 mb-20">
          {/* 컬렉션 뱃지 리스트 */}
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
                    onClick={() => setSelectedCollectionId(c.collection_id)}
                  >
                    {c.title}
                  </button>
                </Badge>
              );
            })}
          </div>

          {/* 장소 카드 리스트 */}
          <div className="flex flex-col gap-3">
            {places.map((p) => (
              <PlaceCard
                key={p.collection_place_id}
                collectionPlace={p}
                href={`/projects/${projectId}/edit/${p.collection_place_id}/create-timeslot`}
              />
            ))}
          </div>
        </main>
      ) : (
        // 자유시간으로 지정
        <main className="flex flex-col p-4 mt-20 mb-20">
          <div className="py-6">
            <TimeSlotForm showMemo values={breakForm} onChange={setBreakForm} />
          </div>
        </main>
      )}

      {/* 하단 고정 버튼 */}
      <BottomFixedButton
        label={
          tab === "place"
            ? "새로운 장소를 플랜에 추가하기"
            : "자유시간 추가하기"
        }
        onClick={tab === "place" ? handleAddNewPlace : handleAddBreak}
        showShadow
        disabled={
          (tab === "place" && !isCollectionExists) ||
          (tab === "break" && !isBreakValid)
        }
      />
    </div>
  );
};

export default AddPlanPage;
