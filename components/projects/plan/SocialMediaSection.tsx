"use client";

import { Label } from "@/components/ui/label";
import { SquareArrowOutUpRight } from "lucide-react";

const SocialMediaSection = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <Label className="text-base font-bold">출처</Label>
      <div className="flex flex-col gap-2">
        <div className="min-w-0 flex items-center justify-between">
          <span className="text-sm font-bold truncate">
            상인 튜브 - 파주 팡팡 맛집 투어
          </span>
          <SquareArrowOutUpRight className="size-6 shrink-0" />
        </div>
        <p className="border border-slate-200 rounded-lg p-3 text-sm">
          이 컨텐츠는 유튜버 상인이 파주 맛집을 투어 한 내용입니다. 유튜버
          상인은 헤이리 예술 마을을 뛰놀며 즐겁게 놀았습니다.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaSection;
