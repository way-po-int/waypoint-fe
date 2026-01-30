"use client";

import Header from "@/components/layout/Header";
import MemberManageSidebar from "@/components/common/MemberManageSidebar";
import { useEffect, useMemo, useState } from "react";
import { planMockData } from "@/mocks/planMockData";
import { useParams, useRouter } from "next/navigation";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { getInitialTripDay } from "@/utils/date";
import ProjectControlsBar from "@/components/projects/ProjectControlsBar";
import { blockMockData } from "@/mocks/blockMockData";
import ProjectBottomTabs, {
  ProjectBottomTabValue,
} from "@/components/projects/ProjectBottomTabs";
import useQueryTab from "@/hooks/useTabQueryParam";
import PlanSection from "@/components/projects/plan/PlanSection";
import BudgetSection from "@/components/projects/budget/BudgetSection";

const ProjectPage = () => {
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
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
  }, [projectId, selectedDay]);

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

  // 보기 모드 → 편집 모드 핸들러
  const handleEditToggle = () => {
    router.push(`/projects/${projectId}/edit`);
  };

  // 헤더 뒤로가기 핸들러
  const handleBack = () => {
    router.replace(`/projects`);
  };

  if (!targetPlan) return null;

  return (
    <div className="flex h-dvh flex-col">
      <Header
        variant="left"
        showBackButton
        showMoreInfoButton
        onBack={handleBack}
        drawerContent={
          <MemberManageSidebar
            variant="project"
            // TODO: 멤버 이름은 collection 중 첫 번째 멤버의 이름들로 임시 저장. 추후 플랜 멤버 조회 API 사용하여 수정 필요
            members={
              targetPlan.collections[0].members.map(
                (member) => member.nickname,
              ) || []
            }
          />
        }
        className="fixed top-0 z-15 inset-x-0 bg-white"
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
          editButtonLabel="편집 하기"
          onToggleEdit={handleEditToggle}
          selectedDay={selectedDay}
          onChangeDay={setSelectedDay}
          showMap={isMapAvailable}
          isMapVisible={isMapVisible}
          onToggleMap={setIsMapVisible}
        />

        {/* "여행 플랜" 탭 + 타임 슬롯이 없을 경우 */}
        {tab === "plan" && !isMapAvailable ? (
          <p className="text-center flex flex-1 items-center justify-center">
            계획된 일정이 없습니다. 편집 모드에서
            <br />
            장소를 추가하여 계획을 시작해보세요
          </p>
        ) : /**
         * TODO: "예산" 탭 + 예산 정보가 없을 경우 아래 내용 보여주기
         *
         * <p className="text-center flex flex-1 items-center justify-center">
         *   예산 정보가 없습니다.
         * </p>
         */
        tab === "plan" ? (
          <PlanSection />
        ) : (
          <BudgetSection />
        )}
      </main>

      {/* 여행 플랜 + 예산 탭 */}
      <ProjectBottomTabs value={tab} onValueChange={setTab} />

      {/* 네비게이션 바 */}
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default ProjectPage;
