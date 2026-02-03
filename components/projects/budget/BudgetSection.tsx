"use client";

import { useMemo } from "react";
import { placeMockData } from "@/mocks/placeMockData";
import { TimeSlot } from "@/types/block";

interface BudgetSectionProps {
  dayTimeSlots: TimeSlot[];
}

const placeAmountMap: Record<string, number> = {
  "53": 7000,
  "54": 20000,
  "55": 15000,
  "56": 12000,
  "57": 10000,
  "58": 18000,
  "59": 8000,
  "60": 12000,
  "61": 9000,
  "62": 20000,
  "63": 15000,
  "64": 17000,
  "65": 8000,
};

const BudgetSection = ({ dayTimeSlots }: BudgetSectionProps) => {
  const totalBudget = 100000000;
  const perPersonBudget = 100000;
  const spentAmount = 10000000;

  const remainingBudget = Math.max(totalBudget - spentAmount, 0);

  const formatCurrency = (value: number) =>
    `${value.toLocaleString("ko-KR")}원`;

  const placeMap = useMemo(
    () =>
      placeMockData.reduce<Record<string, (typeof placeMockData)[number]>>(
        (acc, place) => {
          acc[place.place_id] = place;
          return acc;
        },
        {},
      ),
    [],
  );

  const expenseItems = useMemo(
    () => {
      const getAmountByPlaceId = (placeId?: string) =>
        placeId ? placeAmountMap[placeId] ?? 10000 : 10000;

      return dayTimeSlots
        .slice()
        .sort((a, b) => {
          const byDay = a.day - b.day;
          if (byDay !== 0) return byDay;
          return a.start_time.localeCompare(b.start_time);
        })
        .filter((slot) => slot.type === "PLACE" && slot.blocks.length > 0)
        .map((slot) => {
          const selectedBlock = slot.blocks.find((block) => block.selected);

          if (selectedBlock) {
            return {
              id: slot.time_slot_id,
              type: "confirmed" as const,
              title:
                placeMap[selectedBlock.place_id ?? ""]?.name ??
                selectedBlock.name,
              label: "입장료",
              amount: getAmountByPlaceId(selectedBlock.place_id),
              totalCandidates: slot.blocks.length,
            };
          }

          return {
            id: slot.time_slot_id,
            type: "candidates" as const,
            title: `${slot.blocks.length}개의 후보지가 있어요!`,
            candidates: slot.blocks.map((block) => ({
              id: block.block_id,
              title:
                placeMap[block.place_id ?? ""]?.name ?? block.name,
              label: "입장료",
              amount: getAmountByPlaceId(block.place_id),
            })),
          };
        });
    },
    [dayTimeSlots, placeMap],
  );

  return (
    <div className="flex flex-col">
      <section className="flex w-full flex-col gap-4">
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

        <div className="flex h-[60px] w-full items-center justify-center gap-1 rounded-lg bg-[#F1F5F9] px-2 py-[5px] text-center">
          <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
            현재 여행 예산이{" "}
            <span className="text-sm font-bold leading-5 text-[#374151]">
              {formatCurrency(remainingBudget)}
            </span>{" "}
            만큼 여유 있어요!
          </p>
        </div>
      </section>

      <section className="-mx-4 -mb-40 mt-4 min-h-screen bg-[#F8FAFC] px-4 py-5 pb-44">
        <div className="flex flex-col gap-5">
          {expenseItems.map((item) => {
            if (item.type === "confirmed") {
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex h-10 w-full items-center gap-1 px-4 pt-1">
                      <p className="text-base font-semibold leading-6 text-[#020618]">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex h-[46px] w-full items-center justify-between px-4 pt-2 pb-[14px]">
                      <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                        {item.label}
                      </p>
                      <p className="text-base font-semibold leading-6 text-[#374151]">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                  </div>

                  {item.totalCandidates > 1 && (
                    <button
                      type="button"
                      className="relative z-0 -mt-[10px] flex h-[50px] w-full items-center justify-center gap-[10px] rounded-b-lg bg-[#E2E8F0] pt-5 pb-[14px]"
                    >
                      <span className="text-sm font-medium text-[#94A3B8]">
                        총 {item.totalCandidates}개의 후보지 중 이 장소로
                        확정되었어요.
                      </span>
                    </button>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                  {item.title}
                </p>

                <div className="flex flex-col gap-4">
                  {item.candidates.map((candidate) => (
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
          })}
        </div>
      </section>
    </div>
  );
};

export default BudgetSection;
