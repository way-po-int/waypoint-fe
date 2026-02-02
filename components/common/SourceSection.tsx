"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight } from "lucide-react";

interface SourceSectionProps {
  source?: string | null;
  href?: string | null;
  title?: string;
  emptyText?: string;
  className?: string;
}

const SourceSection = ({
  source,
  href,
  title = "출처",
  emptyText = "출처가 없습니다",
  className,
}: SourceSectionProps) => {
  const link = href ?? source ?? null;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Label className="font-bold">{title}</Label>
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 text-sm truncate">{source ?? emptyText}</p>
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
    </div>
  );
};

export default SourceSection;
