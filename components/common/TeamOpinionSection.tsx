"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface OpinionRow {
  label: string;
  value: number;
}

interface TeamOpinionSectionProps {
  opinions: OpinionRow[];
  message: string;
  title?: string;
  className?: string;
}

const TeamOpinionSection = ({
  opinions,
  message,
  title = "팀원들의 의견",
  className,
}: TeamOpinionSectionProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Label className="font-bold">{title}</Label>
      <div className="flex flex-col gap-6">
        {opinions.map((opinion) => {
          const percent = Math.max(0, Math.min(100, opinion.value));
          return (
            <div key={opinion.label} className="flex items-center gap-4">
              <span className="w-[84px] font-sans text-sm font-normal leading-[20px] tracking-normal text-[#020618]">
                {opinion.label}
              </span>
              <div className="flex-1">
                <div className="h-[6px] w-full bg-[#F8FAFC]">
                  <div
                    className="h-[6px] bg-[#334155]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              <span className="w-[52px] text-right font-sans text-sm font-bold leading-[20px] tracking-normal text-[#020618]">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-[#F87171] bg-[#FEF2F2] px-[10px] py-[9px]">
        <p
          className="m-0 overflow-hidden font-['Inter'] text-[14px] font-normal leading-[140%] tracking-[0px] text-[#71717A] whitespace-pre-line"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default TeamOpinionSection;
