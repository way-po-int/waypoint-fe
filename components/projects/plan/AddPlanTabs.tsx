"use client";

import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

export type AddPlanTabValue = "place" | "break";

interface AddPlanTabsProps {
  value: AddPlanTabValue;
  onValueChange: (value: AddPlanTabValue) => void;
  className?: string;
}

const AddPlanTabs = ({
  value,
  onValueChange,
  className = "",
}: AddPlanTabsProps) => {
  return (
    <div className={`fixed inset-x-0 top-14 z-10 bg-white ${className}`}>
      <Tabs
        value={value}
        onValueChange={(v) => onValueChange(v as AddPlanTabValue)}
        className="px-4"
      >
        <TabsList className="w-full data-[orientation=horizontal]:h-10">
          <TabsTrigger value="place">플랜에 장소 추가하기</TabsTrigger>
          <TabsTrigger value="break">자유시간으로 지정</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AddPlanTabs;
