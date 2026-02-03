"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Pencil, Plus } from "lucide-react";
import { placeMockData } from "@/mocks/placeMockData";
import { planMockData } from "@/mocks/planMockData";
import { TimeSlot } from "@/types/block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CandidateListDrawer from "@/components/projects/plan/CandidateListDrawer";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { BudgetSummary } from "./BudgetSummary";
import { ConfirmedExpenseCard } from "./ConfirmedExpenseCard";
import { CandidatesExpenseCard } from "./CandidatesExpenseCard";
import {
  placeAmountMap,
  formatCurrency,
  sanitizeNumber,
  extractNumbers,
} from "./utils";

interface BudgetEditSectionProps {
  dayTimeSlots: TimeSlot[];
}

interface AdditionalExpense {
  id: string;
  label: string;
  amount: number;
}

const BudgetEditSection = ({ dayTimeSlots }: BudgetEditSectionProps) => {
  const params = useParams<{ projectId?: string }>();
  const projectId = params.projectId;
  const memberCount = useMemo(() => {
    if (!projectId) return 1;
    return planMockData.find((plan) => plan.plan_id === projectId)
      ?.member_count ?? 1;
  }, [projectId]);
  const initialPerPersonBudget = 100000;
  const [perPersonBudgetValue, setPerPersonBudgetValue] = useState(
    initialPerPersonBudget,
  );
  const [totalBudgetValue, setTotalBudgetValue] = useState(
    () => memberCount * initialPerPersonBudget,
  );
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);
  const [candidateNames, setCandidateNames] = useState<string[]>([]);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = useState(false);
  const [isExpenseDrawerOpen, setIsExpenseDrawerOpen] = useState(false);
  const [isTotalEditing, setIsTotalEditing] = useState(false);
  const [isPerPersonEditing, setIsPerPersonEditing] = useState(false);
  const [totalBudgetInput, setTotalBudgetInput] = useState(() =>
    (memberCount * initialPerPersonBudget).toLocaleString("ko-KR"),
  );
  const [perPersonBudgetInput, setPerPersonBudgetInput] = useState(() =>
    initialPerPersonBudget.toLocaleString("ko-KR"),
  );
  const [expenseNameInput, setExpenseNameInput] = useState("");
  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [additionalExpenses, setAdditionalExpenses] = useState<
    Record<string, AdditionalExpense[]>
  >({});
  const [currentExpenseItemId, setCurrentExpenseItemId] = useState<
    string | null
  >(null);
  const [isPlaceBudgetDrawerOpen, setIsPlaceBudgetDrawerOpen] = useState(false);
  const [selectedPlaceTitle, setSelectedPlaceTitle] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [placeExpenseItems, setPlaceExpenseItems] = useState<
    { id: string; label: string; amount: string }[]
  >([{ id: "1", label: "", amount: "" }]);
  const [placeBudgetItems, setPlaceBudgetItems] = useState<
    Record<string, { id: string; label: string; amount: number }[]>
  >({});
  const [isAdditionalExpenseEditOpen, setIsAdditionalExpenseEditOpen] =
    useState(false);
  const [editingExpense, setEditingExpense] = useState<{
    itemId: string;
    expenseId: string;
    label: string;
    amount: string;
  } | null>(null);
  const [isEditingExpenseAmount, setIsEditingExpenseAmount] = useState(false);
  const [editingExpenseAmountInput, setEditingExpenseAmountInput] =
    useState("");

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
        <BudgetSummary
          totalBudget={totalBudgetValue}
          perPersonBudget={perPersonBudgetValue}
        />

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
                  <ConfirmedExpenseCard
                    title={item.title}
                    label={item.label}
                    amount={item.amount}
                    budgetItems={placeBudgetItems[item.id]}
                    totalCandidates={item.totalCandidates}
                    onClick={() => {
                      setSelectedPlaceId(item.id);
                      setSelectedPlaceTitle(item.title);
                      const existingItems = placeBudgetItems[item.id];
                      if (existingItems && existingItems.length > 0) {
                        setPlaceExpenseItems(
                          existingItems.map((e) => ({
                            id: e.id,
                            label: e.label,
                            amount: String(e.amount),
                          }))
                        );
                      } else {
                        setPlaceExpenseItems([
                          { id: "1", label: item.label, amount: String(item.amount) },
                        ]);
                      }
                      setIsPlaceBudgetDrawerOpen(true);
                    }}
                    onCandidateClick={() => {
                      setCandidateNames(
                        item.candidates.map((candidate) => candidate.title),
                      );
                      setIsCandidateOpen(true);
                    }}
                  />

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
                      {(!isLast || (additionalExpenses[item.id]?.length ?? 0) > 0) && (
                        <div className="h-[10px] w-px bg-[#94A3B8]" />
                      )}
                    </div>
                  </div>

                  {additionalExpenses[item.id]?.map((expense, expenseIndex) => (
                    <div key={expense.id} className="flex flex-col">
                      <button
                        type="button"
                        className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                        onClick={() => {
                          setEditingExpense({
                            itemId: item.id,
                            expenseId: expense.id,
                            label: expense.label,
                            amount: String(expense.amount),
                          });
                          setEditingExpenseAmountInput(String(expense.amount));
                          setIsEditingExpenseAmount(false);
                          setIsAdditionalExpenseEditOpen(true);
                        }}
                      >
                        <div className="flex h-[46px] w-full items-center justify-between px-4 py-[14px]">
                          <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                            {expense.label}
                          </p>
                          <p className="text-base font-semibold leading-6 text-[#374151]">
                            {formatCurrency(expense.amount)}
                          </p>
                        </div>
                      </button>
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
                          {(!isLast ||
                            expenseIndex <
                              (additionalExpenses[item.id]?.length ?? 0) - 1) && (
                            <div className="h-[10px] w-px bg-[#94A3B8]" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col">
                <CandidatesExpenseCard
                  title={item.title}
                  candidates={item.candidates}
                />

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
                    {(!isLast || (additionalExpenses[item.id]?.length ?? 0) > 0) && (
                      <div className="h-[10px] w-px bg-[#94A3B8]" />
                    )}
                  </div>
                </div>

                {additionalExpenses[item.id]?.map((expense, expenseIndex) => (
                  <div key={expense.id} className="flex flex-col">
                    <button
                      type="button"
                      className="relative z-10 rounded-lg border border-[#E2E8F0] bg-white text-left shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                      onClick={() => {
                        setEditingExpense({
                          itemId: item.id,
                          expenseId: expense.id,
                          label: expense.label,
                          amount: String(expense.amount),
                        });
                        setEditingExpenseAmountInput(String(expense.amount));
                        setIsEditingExpenseAmount(false);
                        setIsAdditionalExpenseEditOpen(true);
                      }}
                    >
                      <div className="flex h-[46px] w-full items-center justify-between px-4 py-[14px]">
                        <p className="text-sm font-medium leading-5 text-[#9CA3AF]">
                          {expense.label}
                        </p>
                        <p className="text-base font-semibold leading-6 text-[#374151]">
                          {formatCurrency(expense.amount)}
                        </p>
                      </div>
                    </button>
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
                        {(!isLast ||
                          expenseIndex <
                            (additionalExpenses[item.id]?.length ?? 0) - 1) && (
                          <div className="h-[10px] w-px bg-[#94A3B8]" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                      onChange={(event) => {
                        const nextValue = extractNumbers(event.target.value);
                        const totalVal = sanitizeNumber(nextValue);
                        const nextPerPerson =
                          memberCount > 0 ? Math.floor(totalVal / memberCount) : 0;
                        setTotalBudgetInput(nextValue);
                        setTotalBudgetValue(totalVal);
                        setPerPersonBudgetValue(nextPerPerson);
                        setPerPersonBudgetInput(nextPerPerson.toLocaleString("ko-KR"));
                      }}
                      placeholder="숫자만 입력하세요"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  ) : (
                    <p className="text-lg font-semibold leading-6 text-[#111827]">
                      {formatCurrency(totalBudgetValue)}
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
                      onChange={(event) => {
                        const nextValue = extractNumbers(event.target.value);
                        const perPersonVal = sanitizeNumber(nextValue);
                        const nextTotal = perPersonVal * memberCount;
                        setPerPersonBudgetInput(nextValue);
                        setPerPersonBudgetValue(perPersonVal);
                        setTotalBudgetValue(nextTotal);
                        setTotalBudgetInput(nextTotal.toLocaleString("ko-KR"));
                      }}
                      placeholder="숫자만 입력하세요"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  ) : (
                    <p className="text-lg font-semibold leading-6 text-[#111827]">
                      {formatCurrency(perPersonBudgetValue)}
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
                onChange={(event) =>
                  setExpenseAmountInput(extractNumbers(event.target.value))
                }
                placeholder="숫자만 입력하세요"
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

      <Drawer
        open={isPlaceBudgetDrawerOpen}
        onOpenChange={setIsPlaceBudgetDrawerOpen}
      >
        <DrawerContent
          showHandle={false}
          className={`flex flex-col bg-white px-5 py-6 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)] ${
            placeExpenseItems.length >= 4 ? "max-h-[80vh]" : ""
          }`}
        >
          <DrawerTitle className="mb-4 text-lg font-bold leading-6 text-[#111827]">
            {selectedPlaceTitle}
          </DrawerTitle>
          <div
            className={`flex flex-col gap-4 ${
              placeExpenseItems.length >= 4 ? "flex-1 overflow-y-auto" : ""
            }`}
          >
              {placeExpenseItems.map((item, idx) => (
                <div key={item.id} className="flex flex-col gap-4">
                  {idx > 0 && (
                    <div className="w-full border-t border-[#E2E8F0]" />
                  )}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium leading-5 text-[#111827]">
                      예산 항목
                    </p>
                    <Input
                      value={item.label}
                      onChange={(event) => {
                        const newItems = [...placeExpenseItems];
                        newItems[idx] = { ...newItems[idx], label: event.target.value };
                        setPlaceExpenseItems(newItems);
                      }}
                      placeholder="Input Value"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium leading-5 text-[#111827]">
                      금액
                    </p>
                    <Input
                      value={item.amount}
                      onChange={(event) => {
                        const newItems = [...placeExpenseItems];
                        newItems[idx] = {
                          ...newItems[idx],
                          amount: extractNumbers(event.target.value),
                        };
                        setPlaceExpenseItems(newItems);
                      }}
                      placeholder="숫자만 입력하세요"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 w-full rounded-[6px] bg-[#F4F4F5] p-3 text-[#374151] hover:bg-[#E4E4E7]"
                    onClick={() => {
                      setPlaceExpenseItems((prev) => [
                        ...prev,
                        { id: `item-${Date.now()}`, label: "", amount: "" },
                      ]);
                    }}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              ))}
          </div>

          <div className="mt-4 flex h-10 gap-4">
            <Button
              type="button"
              variant="outline"
              size="default"
              className="h-10 flex-1 rounded-[6px] border-[#E4E4E7] px-[17px] py-[9.5px] text-sm font-medium leading-5 text-[#09090B]"
              onClick={() => {
                setPlaceExpenseItems([{ id: "1", label: "", amount: "" }]);
                setSelectedPlaceTitle("");
                setSelectedPlaceId(null);
                setIsPlaceBudgetDrawerOpen(false);
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
                if (selectedPlaceId) {
                  const validItems = placeExpenseItems
                    .filter((item) => item.label && item.amount)
                    .map((item) => ({
                      id: item.id,
                      label: item.label,
                      amount: parseInt(item.amount.replace(/,/g, ""), 10) || 0,
                    }));
                  if (validItems.length > 0) {
                    setPlaceBudgetItems((prev) => ({
                      ...prev,
                      [selectedPlaceId]: validItems,
                    }));
                  }
                }
                setPlaceExpenseItems([{ id: "1", label: "", amount: "" }]);
                setSelectedPlaceTitle("");
                setSelectedPlaceId(null);
                setIsPlaceBudgetDrawerOpen(false);
              }}
            >
              저장
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={isAdditionalExpenseEditOpen}
        onOpenChange={setIsAdditionalExpenseEditOpen}
      >
        <DrawerContent
          showHandle={false}
          className="flex min-h-[280px] flex-col bg-white px-5 pb-8 pt-6 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <DrawerTitle className="mb-4 text-lg font-bold leading-6 text-[#111827]">
            {editingExpense?.label}
          </DrawerTitle>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex h-10 items-center">
                  {isEditingExpenseAmount ? (
                    <Input
                      value={editingExpenseAmountInput}
                      onChange={(event) =>
                        setEditingExpenseAmountInput(
                          extractNumbers(event.target.value)
                        )
                      }
                      placeholder="숫자만 입력하세요"
                      className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
                    />
                  ) : (
                    <p className="text-lg font-semibold leading-6 text-[#111827]">
                      {formatCurrency(
                        parseInt(editingExpenseAmountInput.replace(/,/g, ""), 10) || 0
                      )}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#18181B] p-2"
                onClick={() => setIsEditingExpenseAmount((prev) => !prev)}
              >
                {isEditingExpenseAmount ? (
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
              onClick={() => {
                if (editingExpense) {
                  setAdditionalExpenses((prev) => ({
                    ...prev,
                    [editingExpense.itemId]: (
                      prev[editingExpense.itemId] || []
                    ).filter((e) => e.id !== editingExpense.expenseId),
                  }));
                }
                setEditingExpense(null);
                setIsEditingExpenseAmount(false);
                setEditingExpenseAmountInput("");
                setIsAdditionalExpenseEditOpen(false);
              }}
            >
              삭제
            </Button>
            <Button
              type="button"
              variant="default"
              size="default"
              className="h-10 flex-1 rounded-[6px] bg-[#18181B] px-4 py-[9.5px] text-sm font-medium leading-5 text-[#FAFAFA]"
              onClick={() => {
                if (editingExpense) {
                  const newAmount =
                    parseInt(editingExpenseAmountInput.replace(/,/g, ""), 10) || 0;
                  setAdditionalExpenses((prev) => ({
                    ...prev,
                    [editingExpense.itemId]: (
                      prev[editingExpense.itemId] || []
                    ).map((e) =>
                      e.id === editingExpense.expenseId
                        ? { ...e, amount: newAmount }
                        : e
                    ),
                  }));
                }
                setEditingExpense(null);
                setIsEditingExpenseAmount(false);
                setEditingExpenseAmountInput("");
                setIsAdditionalExpenseEditOpen(false);
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
