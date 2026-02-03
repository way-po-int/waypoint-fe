"use client";

import { useMemo, useState } from "react";
import { Check, Pencil, Plus } from "lucide-react";
import { placeMockData } from "@/mocks/placeMockData";
import { TimeSlot } from "@/types/block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CandidateListDrawer from "@/components/projects/plan/CandidateListDrawer";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

interface BudgetEditSectionProps {
  dayTimeSlots: TimeSlot[];
}

interface AdditionalExpense {
  id: string;
  label: string;
  amount: number;
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

const BudgetEditSection = ({ dayTimeSlots }: BudgetEditSectionProps) => {
  const totalBudget = 100000000;
  const perPersonBudget = 100000;
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);
  const [candidateNames, setCandidateNames] = useState<string[]>([]);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = useState(false);
  const [isExpenseDrawerOpen, setIsExpenseDrawerOpen] = useState(false);
  const [isTotalEditing, setIsTotalEditing] = useState(false);
  const [isPerPersonEditing, setIsPerPersonEditing] = useState(false);
  const [totalBudgetInput, setTotalBudgetInput] = useState(
    totalBudget.toLocaleString("ko-KR"),
  );
  const [perPersonBudgetInput, setPerPersonBudgetInput] = useState(
    perPersonBudget.toLocaleString("ko-KR"),
  );
  const [expenseNameInput, setExpenseNameInput] = useState("");
  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [additionalExpenses, setAdditionalExpenses] = useState<
    Record<string, AdditionalExpense[]>
  >({});
  const [currentExpenseItemId, setCurrentExpenseItemId] = useState<
    string | null
  >(null);

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
              candidates: slot.blocks.map((block) => ({
                id: block.block_id,
                title: placeMap[block.place_id ?? ""]?.name ?? block.name,
              })),
            };
          }

          return {
            id: slot.time_slot_id,
            type: "candidates" as const,
            title: `${slot.blocks.length}개의 후보지가 있어요!`,
            candidates: slot.blocks.map((block) => ({
              id: block.block_id,
              title: placeMap[block.place_id ?? ""]?.name ?? block.name,
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

        <Button
          type="button"
          variant="default"
          size="lg"
          className="h-[44px] w-full rounded-[6px] bg-[#18181B] px-8 py-[11.5px] text-sm font-medium leading-5 text-[#FAFAFA]"
          onClick={() => setIsBudgetDrawerOpen(true)}
        >
          우리의 여행예산 편집하기
        </Button>
      </section>

      <section className="-mx-4 -mb-40 mt-4 min-h-screen bg-[#F8FAFC] px-4 py-5 pb-44">
        <div className="flex flex-col">
          {expenseItems.map((item, index) => {
            const isLast = index === expenseItems.length - 1;
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
                      onClick={() => {
                        setCandidateNames(
                          item.candidates.map((candidate) => candidate.title),
                        );
                        setIsCandidateOpen(true);
                      }}
                    >
                      <span className="text-sm font-medium text-[#94A3B8]">
                        총 {item.totalCandidates}개의 후보지 중 이 장소로
                        확정되었어요.
                      </span>
                    </button>
                  )}

                  {/* 추가 지출 카드들 */}
                  {additionalExpenses[item.id]?.map((expense) => (
                    <div
                      key={expense.id}
                      className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                    >
                      <div className="flex h-[46px] w-full items-center justify-between px-4 py-[14px]">
                        <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                          {expense.label}
                        </p>
                        <p className="text-base font-semibold leading-6 text-[#374151]">
                          {formatCurrency(expense.amount)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="h-[10px] w-px bg-[#94A3B8]" />
                      <div className="relative">
                        <Button
                          variant="ghost"
                          className="h-7 w-7 rounded-[20px] bg-[#94A3B8] p-0 hover:bg-[#94A3B8]/80"
                          onClick={() => {
                            setCurrentExpenseItemId(item.id);
                            setIsExpenseDrawerOpen(true);
                          }}
                        >
                          <Plus className="h-3 w-3 text-white" />
                        </Button>
                        <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-sm font-medium leading-5 text-[#94A3B8]">
                          추가 지출
                        </span>
                      </div>
                      {!isLast && <div className="h-[10px] w-px bg-[#94A3B8]" />}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col">
                <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] p-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
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

                {/* 추가 지출 카드들 */}
                {additionalExpenses[item.id]?.map((expense) => (
                  <div
                    key={expense.id}
                    className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex h-[46px] w-full items-center justify-between px-4 py-[14px]">
                      <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                        {expense.label}
                      </p>
                      <p className="text-base font-semibold leading-6 text-[#374151]">
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="h-[10px] w-px bg-[#94A3B8]" />
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className="h-7 w-7 rounded-[20px] bg-[#94A3B8] p-0 hover:bg-[#94A3B8]/80"
                        onClick={() => {
                          setCurrentExpenseItemId(item.id);
                          setIsExpenseDrawerOpen(true);
                        }}
                      >
                        <Plus className="h-3 w-3 text-white" />
                      </Button>
                      <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-sm font-medium leading-5 text-[#94A3B8]">
                        추가 지출
                      </span>
                    </div>
                    {!isLast && <div className="h-[10px] w-px bg-[#94A3B8]" />}
                  </div>
                </div>
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

      <Drawer open={isBudgetDrawerOpen} onOpenChange={setIsBudgetDrawerOpen}>
        <DrawerContent
          showHandle={false}
          className="flex min-h-[280px] flex-col bg-white px-5 py-6 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <DrawerTitle className="sr-only">여행 예산 편집</DrawerTitle>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-sm font-medium leading-5 text-[#111827]">
                  여행 총 예산
                </p>
                <div className="flex h-10 items-center">
                  {isTotalEditing ? (
                    <Input
                      value={totalBudgetInput}
                      onChange={(event) =>
                        setTotalBudgetInput(event.target.value)
                      }
                      placeholder="Input Value"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  ) : (
                    <p className="text-lg font-semibold leading-6 text-[#111827]">
                      {formatCurrency(totalBudget)}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#18181B] p-2"
                onClick={() => setIsTotalEditing((prev) => !prev)}
              >
                {isTotalEditing ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <Pencil className="h-6 w-6 text-white" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-sm font-medium leading-5 text-[#111827]">
                  1인당 비용
                </p>
                <div className="flex h-10 items-center">
                  {isPerPersonEditing ? (
                    <Input
                      value={perPersonBudgetInput}
                      onChange={(event) =>
                        setPerPersonBudgetInput(event.target.value)
                      }
                      placeholder="Input Value"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  ) : (
                    <p className="text-lg font-semibold leading-6 text-[#111827]">
                      {formatCurrency(perPersonBudget)}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#18181B] p-2"
                onClick={() => setIsPerPersonEditing((prev) => !prev)}
              >
                {isPerPersonEditing ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <Pencil className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-auto flex h-10 gap-4">
            <Button
              type="button"
              variant="outline"
              size="default"
              className="h-10 flex-1 rounded-[6px] border-[#E4E4E7] px-[17px] py-[9.5px] text-sm font-medium leading-5 text-[#09090B]"
              onClick={() => setIsBudgetDrawerOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="default"
              size="default"
              className="h-10 flex-1 rounded-[6px] bg-[#18181B] px-4 py-[9.5px] text-sm font-medium leading-5 text-[#FAFAFA]"
              onClick={() => setIsBudgetDrawerOpen(false)}
            >
              저장
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={isExpenseDrawerOpen} onOpenChange={setIsExpenseDrawerOpen}>
        <DrawerContent
          showHandle={false}
          className="flex min-h-[280px] flex-col bg-white px-5 py-6 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <DrawerTitle className="sr-only">추가 지출 입력</DrawerTitle>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium leading-5 text-[#111827]">
                지출 항목
              </p>
              <Input
                value={expenseNameInput}
                onChange={(event) => setExpenseNameInput(event.target.value)}
                placeholder="Input Value"
                className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium leading-5 text-[#111827]">
                금액
              </p>
              <Input
                value={expenseAmountInput}
                onChange={(event) => setExpenseAmountInput(event.target.value)}
                placeholder="Input Value"
                className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          <div className="mt-auto flex h-10 gap-4">
            <Button
              type="button"
              variant="outline"
              size="default"
              className="h-10 flex-1 rounded-[6px] border-[#E4E4E7] px-[17px] py-[9.5px] text-sm font-medium leading-5 text-[#09090B]"
              onClick={() => {
                setExpenseNameInput("");
                setExpenseAmountInput("");
                setCurrentExpenseItemId(null);
                setIsExpenseDrawerOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="default"
              size="default"
              className="h-10 flex-1 rounded-[6px] bg-[#18181B] px-4 py-[9.5px] text-sm font-medium leading-5 text-[#FAFAFA]"
              onClick={() => {
                if (currentExpenseItemId && expenseNameInput && expenseAmountInput) {
                  const newExpense: AdditionalExpense = {
                    id: `expense-${Date.now()}`,
                    label: expenseNameInput,
                    amount: parseInt(expenseAmountInput.replace(/,/g, ""), 10) || 0,
                  };
                  setAdditionalExpenses((prev) => ({
                    ...prev,
                    [currentExpenseItemId]: [
                      ...(prev[currentExpenseItemId] || []),
                      newExpense,
                    ],
                  }));
                }
                setExpenseNameInput("");
                setExpenseAmountInput("");
                setCurrentExpenseItemId(null);
                setIsExpenseDrawerOpen(false);
              }}
            >
              저장
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BudgetEditSection;
