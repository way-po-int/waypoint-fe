"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddExpenseButtonProps {
  onClick: () => void;
  showBottomDivider?: boolean;
}

export const AddExpenseButton = ({
  onClick,
  showBottomDivider = true,
}: AddExpenseButtonProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <div className="h-[10px] w-px bg-[#94A3B8]" />
        <div className="relative">
          <Button
            variant="ghost"
            className="h-7 w-7 rounded-[20px] bg-[#94A3B8] p-0 hover:bg-[#94A3B8]/80"
            onClick={onClick}
          >
            <Plus className="h-3 w-3 text-white" />
          </Button>
          <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-sm font-medium leading-5 text-[#94A3B8]">
            추가 지출
          </span>
        </div>
        {showBottomDivider && <div className="h-[10px] w-px bg-[#94A3B8]" />}
      </div>
    </div>
  );
};
