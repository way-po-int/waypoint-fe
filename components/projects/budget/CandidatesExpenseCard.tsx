"use client";

import { formatCurrency } from "./utils";

interface Candidate {
  id: string;
  title: string;
  label: string;
  amount: number;
}

interface CandidatesExpenseCardProps {
  title: string;
  candidates: Candidate[];
}

export const CandidatesExpenseCard = ({
  title,
  candidates,
}: CandidatesExpenseCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <p className="text-sm font-medium leading-5 text-[#9CA3AF]">{title}</p>

      <div className="flex flex-col gap-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="rounded-lg border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex h-10 w-full items-center gap-1 px-4 pt-1">
              <p className="text-base font-semibold leading-6 text-[#020618]">
                {candidate.title}
              </p>
            </div>
            <div className="flex h-[46px] w-full items-center justify-between px-4 pt-2 pb-[14px]">
              <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                {candidate.label}
              </p>
              <p className="text-base font-semibold leading-6 text-[#374151]">
                {formatCurrency(candidate.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
