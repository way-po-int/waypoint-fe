"use client";

import { formatCurrency } from "./utils";

interface BudgetSummaryProps {
  totalBudget: number;
  perPersonBudget: number;
}

export const BudgetSummary = ({
  totalBudget,
  perPersonBudget,
}: BudgetSummaryProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex h-[50px] flex-1 flex-col gap-[6px]">
        <p className="text-sm font-semibold leading-5 text-[#64748B]">
          우리의 여행예산
        </p>
        <p className="text-base font-bold leading-6 text-[#020618]">
          {formatCurrency(totalBudget)}
        </p>
      </div>

      <div className="flex h-[50px] flex-1 flex-col gap-[6px]">
        <p className="text-sm font-semibold leading-5 text-[#64748B]">
          1인당 비용
        </p>
        <p className="text-base font-bold leading-6 text-[#020618]">
          {formatCurrency(perPersonBudget)}
        </p>
      </div>
    </div>
  );
};
