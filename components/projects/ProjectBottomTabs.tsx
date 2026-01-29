"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useParams, useRouter } from "next/navigation";

export type ProjectBottomTabValue = "plan" | "budget";

interface ProjectBottomTabsProps {
  value?: ProjectBottomTabValue;
  onValueChange: (value: ProjectBottomTabValue) => void;
  isPlanEditing?: boolean;
  className?: string;
}

const ProjectBottomTabs = ({
  value,
  onValueChange,
  isPlanEditing = false,
  className = "",
}: ProjectBottomTabsProps) => {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();

  const projectId = params.projectId;

  const handleAddPlan = () => {
    router.push(`/projects/${projectId}/edit/add-plan`);
  };

  return (
    <div
      className={`w-full flex items-center justify-center gap-3 fixed bottom-25 z-10 inset-x-0 bg-white ${isPlanEditing ? "px-4" : "px-12.5"} ${className}`}
    >
      <Tabs
        value={value}
        onValueChange={(v) => onValueChange(v as ProjectBottomTabValue)}
        className="flex-1"
      >
        <TabsList className="w-full data-[orientation=horizontal]:h-12 shadow-[0_4px_6px_0_rgba(0,0,0,0.2)]">
          <TabsTrigger value="plan">여행 플랜</TabsTrigger>
          <TabsTrigger value="budget">예산</TabsTrigger>
        </TabsList>
      </Tabs>

      {isPlanEditing && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 shadow-[0_4px_6px_0_rgba(0,0,0,0.2)]"
          onClick={handleAddPlan}
        >
          <Plus />
        </Button>
      )}
    </div>
  );
};

export default ProjectBottomTabs;
