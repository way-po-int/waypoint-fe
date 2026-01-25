"use client";

import Header from "@/components/layout/Header";
import MemberManageSidebar from "@/components/common/MemberManageSidebar";
import { Plan } from "@/types/plan";
import { useState } from "react";
import { planMockData } from "@/mocks/planMockData";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Plan | null>(
    planMockData.find((plan) => plan.plan_id === projectId) || null
  );
  console.log(project);
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
        className="fixed top-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default ProjectPage;
