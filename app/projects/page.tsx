"use client";

import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { planMockData } from "@/mocks/planMockData";
import { Plan } from "@/types/plan";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProjectsPage = () => {
  const [plans, setPlans] = useState<Plan[]>(planMockData);
  const router = useRouter();
  const navItems = [
    {
      icon: <DiamondIcon isActive={false} />,
      label: "컬렉션",
      path: "/home",
    },
    {
      icon: <DiamondIcon isActive={true} />,
      label: "프로젝트",
      path: "/projects",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "마이",
      path: "/my",
    },
  ];

  const handlePlanCreate = () => {
    router.push("/projects/create");
  };

  if (plans.length > 0) {
    return (
      <div className="w-full min-h-screen">
        <Header
          showNotificationButton
          variant="logo"
          className="fixed top-0 z-10 inset-x-0"
        />
        <h2 className="text-lg font-semibold mt-21 ml-5">내 여행 계획</h2>
        <main className="flex flex-col gap-3 mt-5 mx-5 h-full overflow-y-auto mb-40">
          {plans.map((plan) => (
            <ProjectCard key={plan.plan_id} plan={plan} />
          ))}
        </main>
        <div className="p-4 bg-white fixed inset-x-0 bottom-20 w-full">
          <Button className="w-full" onClick={handlePlanCreate}>
            플랜 추가하기
          </Button>
        </div>
        <NavigationBar
          items={navItems}
          className="fixed bottom-0 z-10 inset-x-0"
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <Header
        showNotificationButton
        variant="logo"
        className="fixed top-0 z-10 inset-x-0"
      />
      <Label className="text-lg font-bold fixed top-17 z-10 left-5">
        내 여행 계획
      </Label>
      <main className="flex flex-col mt-17 mx-5 justify-center items-center h-[calc(100vh-160px)]">
        <p className="text-center mb-6">
          여행 계획이 아직 없습니다.
          <br />
          새로운 여행을 시작해보세요.
        </p>
        <Link href="/projects/create">
          <Button className="w-38.5 h-10">여행 계획하기</Button>
        </Link>
      </main>
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 inset-x-0"
      />
    </div>
  );
};

export default ProjectsPage;
