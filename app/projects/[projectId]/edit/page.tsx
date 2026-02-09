"use client";

import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import BudgetEditSection from "@/components/projects/budget/BudgetEditSection";
import PlanEditSection from "@/components/projects/plan/PlanEditSection";
import ProjectBottomTabs, {
  ProjectBottomTabValue,
} from "@/components/projects/ProjectBottomTabs";
import ProjectControlsBar from "@/components/projects/ProjectControlsBar";
import { Button } from "@/components/ui/button";
import useQueryTab from "@/hooks/useTabQueryParam";
import { blockMockData } from "@/mocks/blockMockData";
import { planMockData } from "@/mocks/planMockData";
import { getInitialTripDay } from "@/utils/date";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const PlanEditPage = () => {
  const router = useRouter();
  const params = useParams<{ projectId?: string }>();
  const projectId = params.projectId;

  const { tab, setTab } = useQueryTab<ProjectBottomTabValue>({
    defaultValue: "plan",
    allowedValues: ["plan", "budget"],
  });

  // 현재 프로젝트(플랜) Mock 데이터 찾기
  // TODO: 추후 플랜 조회(GET) API 연동
  const targetPlan = useMemo(() => {
    if (!projectId) return null;
    return planMockData.find((p) => p.plan_id === projectId) ?? null;
  }, [projectId]);

  // 여행 초기 DAY 계산 (여행 기간이면 해당 DAY로 보여줌)
  const initialDay = useMemo(() => {
    if (!targetPlan) return 1;
    return getInitialTripDay(targetPlan.start_date, targetPlan.end_date);
  }, [targetPlan]);

  // 현재 보고 있는 일차
  const [selectedDay, setSelectedDay] = useState(() => initialDay);
  // 지도 표시 토글 상태
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    setSelectedDay(initialDay);
  }, [initialDay]);

  // 선텍된 일차의 타임슬롯(블록) 목록
  // TODO: 추후 시간 슬롯 조회(GET) API 연동
  const dayTimeSlots = useMemo(() => {
    if (!projectId) return [];

    const slots = blockMockData[projectId] ?? [];
    return slots
      .filter((slot) => slot.day === selectedDay)
      .sort((a, b) => {
        const byStart = a.start_time.localeCompare(b.start_time);
        if (byStart !== 0) return byStart;

        return a.end_time.localeCompare(b.end_time);
      });
  }, [projectId, selectedDay]);

  // 플랜에 연결된 컬렉션이 0개인지 여부
  const isCollectionEmpty = targetPlan
    ? targetPlan.collections.length === 0
    : true;
  // 선택된 일차의 타임슬롯(블록) 1개 이상인지 여부
  const isMapAvailable = dayTimeSlots.length > 0;

  // 선택된 일차의 타임슬롯(블록) 0개이면 지도 숨김
  useEffect(() => {
    if (!isMapAvailable) setIsMapVisible(false);
  }, [isMapAvailable]);

  const navItems = [
    { icon: <DiamondIcon isActive={false} />, label: "컬렉션", path: "/home" },
    {
      icon: <DiamondIcon isActive={true} />,
      label: "프로젝트",
      path: "/projects",
    },
    { icon: <DiamondIcon isActive={false} />, label: "마이", path: "/my" },
  ];

  // 편집 모드 → 보기 모드 핸들러
  const handleEditToggle = () => {
    const query = new URLSearchParams();
    if (tab === "budget") query.set("tab", "budget");
    const suffix = query.toString();
    router.push(
      suffix ? `/projects/${projectId}?${suffix}` : `/projects/${projectId}`,
    );
  };

  // 컬렉션 가져오기 핸들러
  const handleImportCollection = () => {
    router.push(
      `/projects/${projectId}/import-collection?returnTo=/projects/${projectId}/edit`,
    );
  };

  // 헤더 뒤로가기 핸들러
  const handleBack = () => {
    router.replace(`/projects/${projectId}`);
  };

  if (!targetPlan) return null;

  return (
    <div className="flex h-dvh flex-col">
      {/* 헤더: 뒤로가기 + 메뉴 버튼 */}
      <Header
        variant="center"
        title="편집모드"
        showBackButton
        className="fixed top-0 z-15 inset-x-0 bg-white"
        showBackground={false}
        onBack={handleBack}
      />

      {/* TODO: 추후 구글 지도 보여주기 */}
      {isMapVisible && <div className="w-full h-57 bg-gray-300 mt-14" />}

      <main
        className={`flex flex-col flex-1 min-h-0 p-4 gap-5 overflow-y-auto overscroll-contain pb-40 ${isMapVisible ? "" : "mt-14"}`}
      >
        <ProjectControlsBar
          title={targetPlan.title}
          startDate={targetPlan.start_date}
          endDate={targetPlan.end_date}
          editButtonLabel="편집 종료"
          onToggleEdit={handleEditToggle}
          selectedDay={selectedDay}
          onChangeDay={setSelectedDay}
          showMap={isMapAvailable}
          isMapVisible={isMapVisible}
          onToggleMap={setIsMapVisible}
        />

        {/* 가져온 컬렉션이 없을 경우 */}
        {isCollectionEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-center flex items-center justify-center">
              추가된 컬렉션이 없습니다.
              <br />
              컬렉션의 장소를 플랜에 추가하시겠어요?
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={handleImportCollection}
            >
              플랜에 컬렉션 불러오기
            </Button>
          </div>
        ) : tab === "plan" ? (
          <PlanEditSection dayTimeSlots={dayTimeSlots} />
        ) : (
          <BudgetEditSection
            key={projectId}
            dayTimeSlots={dayTimeSlots}
          />
        )}
      </main>

      {/* 여행 플랜 + 예산 탭 */}
      <ProjectBottomTabs
        value={tab}
        onValueChange={setTab}
        isPlanEditing={tab === "plan"}
      />

      {/* 네비게이션 바 */}
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default PlanEditPage;
