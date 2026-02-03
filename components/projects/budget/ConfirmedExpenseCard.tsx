"use client";

import { formatCurrency } from "./utils";

interface BudgetItem {
  id: string;
  label: string;
  amount: number;
}

interface ConfirmedExpenseCardProps {
  title: string;
  label?: string;
  amount?: number;
  budgetItems?: BudgetItem[];
  totalCandidates?: number;
  onClick?: () => void;
  onCandidateClick?: () => void;
}

export const ConfirmedExpenseCard = ({
  title,
  label,
  amount,
  budgetItems,
  totalCandidates,
  onClick,
  onCandidateClick,
}: ConfirmedExpenseCardProps) => {
  const showCandidateButton = totalCandidates && totalCandidates > 1;

  return (
    <>
      <button
        type="button"
        className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        onClick={onClick}
      >
        <div className="flex h-10 w-full items-center gap-1 px-4 pt-1">
          <p className="text-base font-semibold leading-6 text-[#020618]">
            {title}
          </p>
        </div>
        {budgetItems && budgetItems.length > 0 ? (
          budgetItems.map((budgetItem, budgetIdx) => (
            <div
              key={budgetItem.id}
              className={`flex h-[46px] w-full items-center justify-between px-4 ${
                budgetIdx === 0 ? "pt-2" : ""
              } ${budgetIdx === budgetItems.length - 1 ? "pb-[14px]" : ""}`}
            >
              <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                {budgetItem.label}
              </p>
              <p className="text-base font-semibold leading-6 text-[#374151]">
                {formatCurrency(budgetItem.amount)}
              </p>
            </div>
          ))
        ) : (
          <div className="flex h-[46px] w-full items-center justify-between px-4 pt-2 pb-[14px]">
            <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
              {label}
            </p>
            <p className="text-base font-semibold leading-6 text-[#374151]">
              {formatCurrency(amount ?? 0)}
            </p>
          </div>
        )}
      </button>

      {showCandidateButton && (
        <button
          type="button"
          className="relative z-0 -mt-[10px] flex h-[50px] w-full items-center justify-center gap-[10px] rounded-b-lg bg-[#E2E8F0] pt-5 pb-[14px]"
          onClick={onCandidateClick}
        >
          <span className="text-sm font-medium text-[#94A3B8]">
            총 {totalCandidates}개의 후보지 중 이 장소로 확정되었어요.
          </span>
        </button>
      )}
    </>
  );
};
