"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { placeMockData } from "@/mocks/placeMockData";
import { planMockData } from "@/mocks/planMockData";
import { TimeSlot } from "@/types/block";
import CandidateListDrawer from "@/components/projects/plan/CandidateListDrawer";
import { BudgetSummary } from "./BudgetSummary";
import { ConfirmedExpenseCard } from "./ConfirmedExpenseCard";
import { CandidatesExpenseCard } from "./CandidatesExpenseCard";
import { ExpenseDivider } from "./ExpenseDivider";
import { placeAmountMap, formatCurrency } from "./utils";

interface BudgetSectionProps {
  dayTimeSlots: TimeSlot[];
}

const BudgetSection = ({ dayTimeSlots }: BudgetSectionProps) => {
  const params = useParams<{ projectId?: string }>();
  const projectId = params.projectId;
  const perPersonBudget = 100000;
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);
  const [candidateNames, setCandidateNames] = useState<string[]>([]);

  const memberCount = useMemo(() => {
    if (!projectId) return 1;
    return planMockData.find((plan) => plan.plan_id === projectId)
      ?.member_count ?? 1;
  }, [projectId]);

  const totalBudget = memberCount * perPersonBudget;

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
              candidates: slot.blocks.map((block) => ({
                id: block.block_id,
                title:
                  placeMap[block.place_id ?? ""]?.name ?? block.name,
              })),
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

  const spentAmount = useMemo(
    () =>
      expenseItems.reduce(
        (acc, item) => (item.type === "confirmed" ? acc + item.amount : acc),
        0,
      ),
    [expenseItems],
  );

  const remainingBudget = Math.max(totalBudget - spentAmount, 0);

  return (
    <div className="flex flex-col">
      <section className="flex w-full flex-col gap-4">
        <BudgetSummary
          totalBudget={totalBudget}
          perPersonBudget={perPersonBudget}
        />

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
        <div className="flex flex-col">
          {expenseItems.map((item, index) => {
            const isLast = index === expenseItems.length - 1;
            if (item.type === "confirmed") {
              return (
                <div key={item.id} className="flex flex-col">
                  <ConfirmedExpenseCard
                    title={item.title}
                    label={item.label}
                    amount={item.amount}
                    totalCandidates={item.totalCandidates}
                    onCandidateClick={() => {
                      setCandidateNames(
                        item.candidates.map((candidate) => candidate.title),
                      );
                      setIsCandidateOpen(true);
                    }}
                  />

                  {!isLast && <ExpenseDivider />}
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col">
                <CandidatesExpenseCard
                  title={item.title}
                  candidates={item.candidates}
                />

                {!isLast && <ExpenseDivider />}
              </div>
            );
          })}
        </div>
      </section>

      <CandidateListDrawer
        open={isCandidateOpen}
        onOpenChange={setIsCandidateOpen}
        candidates={candidateNames}
      />
    </div>
  );
};

export default BudgetSection;
