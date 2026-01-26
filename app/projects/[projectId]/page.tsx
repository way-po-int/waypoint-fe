"use client";

import Header from "@/components/layout/Header";
import MemberManageSidebar from "@/components/common/MemberManageSidebar";
import { Plan } from "@/types/plan";
import { useState } from "react";
import { planMockData } from "@/mocks/planMockData";
import { useParams } from "next/navigation";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, RouteIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateTravelDuration } from "@/utils/date";

const ProjectPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Plan | null>(
    planMockData.find((plan) => plan.plan_id === projectId) || null
  );
  const [activeTab, setActiveTab] = useState<"plan" | "budget">("plan");
  const navItems = [
    { icon: <DiamondIcon isActive={false} />, label: "컬렉션", path: "/home" },
    {
      icon: <DiamondIcon isActive={true} />,
      label: "프로젝트",
      path: "/projects",
    },
    { icon: <DiamondIcon isActive={false} />, label: "마이", path: "/my" },
  ];
  return (
    <div className="w-full min-h-screen">
      <Header
        variant="left"
        showBackButton
        showMoreInfoButton
        drawerContent={
          <MemberManageSidebar
            variant="project"
            // TODO: 멤버 이름은 collection 중 첫 번째 멤버의 이름들로 임시 저장. 추후 플랜 멤버 조회 API 사용하여 수정 필요
            members={
              project?.collections[0].members.map(
                (member) => member.nickname
              ) || []
            }
          />
        }
        className="fixed top-0 z-10 inset-x-0 bg-white"
      />
      <div className="mt-18 mx-5 flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3 items-center">
            <Label className="text-xl font-bold">{project?.title}</Label>
            <p className="text-sm text-gray-500">
              {project?.start_date && project?.end_date
                ? calculateTravelDuration(project.start_date, project.end_date)
                : `${project?.start_date} - ${project?.end_date}`}
            </p>
          </div>
          <Button className="px-3 py-0">편집 하기</Button>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center">
            <RouteIcon className="size-4 text-white" strokeWidth={3} />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-black">DAY 1</span>
              <ChevronRightIcon className="size-6 text-black" strokeWidth={2} />
            </div>
            <p className="text-sm text-[#71717a]">하루를 계획해보세요</p>
          </div>
        </div>
      </div>
      {(activeTab === "plan" || activeTab === "budget") && (
        <div className="flex items-center justify-center min-h-[40vh] px-5">
          <div className="text-center">
            {activeTab === "plan" ? (
              <p className="text-sm text-gray-600">
                계획된 일정이 없습니다. 편집 모드에서
                <br />
                장소를 추가하여 계획을 시작해보세요
              </p>
            ) : (
              <p className="text-sm text-gray-600">예산 정보가 없습니다.</p>
            )}
          </div>
        </div>
      )}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "plan" | "budget")}
      >
        <div className="fixed bottom-22 left-1/2 -translate-x-1/2 z-10">
          <TabsList className="w-70 !h-12 flex bg-gray-200 p-2 rounded-1.5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <TabsTrigger
              value="plan"
              className="flex-1 !h-10 text-sm font-medium"
            >
              여행 플랜
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="flex-1 !h-10 text-sm font-medium"
            >
              예산
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default ProjectPage;
