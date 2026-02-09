"use client";

import { formatCurrency } from "./utils";

interface AdditionalExpenseCardProps {
  label: string;
  amount: number;
  onClick: () => void;
}

export const AdditionalExpenseCard = ({
  label,
  amount,
  onClick,
}: AdditionalExpenseCardProps) => {
  return (
    <button
      type="button"
      className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      onClick={onClick}
    >
      <div className="flex h-[46px] w-full items-center justify-between px-4 py-[14px]">
        <p className="text-sm font-medium leading-5 text-[#9CA3AF]">{label}</p>
        <p className="text-base font-semibold leading-6 text-[#374151]">
          {formatCurrency(amount)}
        </p>
      </div>
    </button>
  );
};
