"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight } from "lucide-react";

interface SourceSectionProps {
  source?: string | null;
  href?: string | null;
  content?: string | null;
  title?: string;
  emptyText?: string;
  emptyContentText?: string;
  className?: string;
}

const SourceSection = ({
  source,
  href,
  content,
  title = "출처",
  emptyText = "출처가 없습니다",
  emptyContentText = "추후 유튜브 제목 및 컨텐츠 내용으로 변경 필요합니다. 상인 튜브 구독 좋아요",
  className,
}: SourceSectionProps) => {
  const link = href ?? source ?? null;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label className="font-bold">{title}</Label>
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 font-sans text-sm font-bold leading-[20px] tracking-normal text-[#020618] truncate">
          {source ?? emptyText}
        </p>
        {link ? (
          <button
            type="button"
            aria-label="출처 열기"
            className="shrink-0"
            onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
          >
            <SquareArrowOutUpRight className="size-5" strokeWidth={2.2} />
          </button>
        ) : null}
      </div>
      <div className="h-[91px] w-full rounded-lg border border-slate-200 p-3 font-sans text-sm font-normal leading-[20px] tracking-normal text-[#020618]">
        {content ?? emptyContentText}
      </div>
    </div>
  );
};

export default SourceSection;
