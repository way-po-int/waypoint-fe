"use client";

import { Button } from "@/components/ui/button";

const TravelPlanStartSection = () => {
  return (
    <div className="flex flex-col gap-3 mx-2 my-3">
      <h3 className="text-base font-bold">이제 여행갈 준비가 되셨나요?</h3>
      <Button className="py-3 px-8">이 컬렉션으로 여행계획 시작하기</Button>
    </div>
  );
};

export default TravelPlanStartSection;
