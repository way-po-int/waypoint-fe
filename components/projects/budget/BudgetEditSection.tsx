"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { placeMockData } from "@/mocks/placeMockData";
import { planMockData } from "@/mocks/planMockData";
import { TimeSlot } from "@/types/block";
import { Button } from "@/components/ui/button";
import CandidateListDrawer from "@/components/projects/plan/CandidateListDrawer";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { BudgetSummary } from "./BudgetSummary";
import { ConfirmedExpenseCard } from "./ConfirmedExpenseCard";
import { CandidatesExpenseCard } from "./CandidatesExpenseCard";
import { AddExpenseButton } from "./AddExpenseButton";
import { AdditionalExpenseCard } from "./AdditionalExpenseCard";
import { DrawerActions } from "./DrawerActions";
import { EditableField } from "./EditableField";
import { FormField } from "./FormField";
import {
  placeAmountMap,
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

  const resetExpenseDraft = () => {
    setExpenseNameInput("");
    setExpenseAmountInput("");
    setCurrentExpenseItemId(null);
  };

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

                  <AddExpenseButton
                    onClick={() => {
                      resetExpenseDraft();
                      setCurrentExpenseItemId(item.id);
                      setIsExpenseDrawerOpen(true);
                    }}
                    showBottomDivider={
                      !isLast || (additionalExpenses[item.id]?.length ?? 0) > 0
                    }
                  />

                  {additionalExpenses[item.id]?.map((expense, expenseIndex) => (
                    <div key={expense.id} className="flex flex-col">
                      <AdditionalExpenseCard
                        label={expense.label}
                        amount={expense.amount}
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
                      />
                      <AddExpenseButton
                        onClick={() => {
                          resetExpenseDraft();
                          setCurrentExpenseItemId(item.id);
                          setIsExpenseDrawerOpen(true);
                        }}
                        showBottomDivider={
                          !isLast ||
                          expenseIndex <
                            (additionalExpenses[item.id]?.length ?? 0) - 1
                        }
                      />
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

                <AddExpenseButton
                  onClick={() => {
                    resetExpenseDraft();
                    setCurrentExpenseItemId(item.id);
                    setIsExpenseDrawerOpen(true);
                  }}
                  showBottomDivider={
                    !isLast || (additionalExpenses[item.id]?.length ?? 0) > 0
                  }
                />

                {additionalExpenses[item.id]?.map((expense, expenseIndex) => (
                  <div key={expense.id} className="flex flex-col">
                    <AdditionalExpenseCard
                      label={expense.label}
                      amount={expense.amount}
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
                    />
                    <AddExpenseButton
                      onClick={() => {
                        resetExpenseDraft();
                        setCurrentExpenseItemId(item.id);
                        setIsExpenseDrawerOpen(true);
                      }}
                      showBottomDivider={
                        !isLast ||
                        expenseIndex <
                          (additionalExpenses[item.id]?.length ?? 0) - 1
                      }
                    />
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
            <EditableField
              label="여행 총 예산"
              value={totalBudgetValue}
              inputValue={totalBudgetInput}
              isEditing={isTotalEditing}
              onToggleEdit={() => setIsTotalEditing((prev) => !prev)}
              onInputChange={(value) => {
                const nextValue = extractNumbers(value);
                const totalVal = sanitizeNumber(nextValue);
                const nextPerPerson =
                  memberCount > 0 ? Math.floor(totalVal / memberCount) : 0;
                setTotalBudgetInput(nextValue);
                setTotalBudgetValue(totalVal);
                setPerPersonBudgetValue(nextPerPerson);
                setPerPersonBudgetInput(nextPerPerson.toLocaleString("ko-KR"));
              }}
            />

            <EditableField
              label="1인당 비용"
              value={perPersonBudgetValue}
              inputValue={perPersonBudgetInput}
              isEditing={isPerPersonEditing}
              onToggleEdit={() => setIsPerPersonEditing((prev) => !prev)}
              onInputChange={(value) => {
                const nextValue = extractNumbers(value);
                const perPersonVal = sanitizeNumber(nextValue);
                const nextTotal = perPersonVal * memberCount;
                setPerPersonBudgetInput(nextValue);
                setPerPersonBudgetValue(perPersonVal);
                setTotalBudgetValue(nextTotal);
                setTotalBudgetInput(nextTotal.toLocaleString("ko-KR"));
              }}
            />
          </div>

          <DrawerActions
            onCancel={() => setIsBudgetDrawerOpen(false)}
            onSave={() => setIsBudgetDrawerOpen(false)}
          />
        </DrawerContent>
      </Drawer>

      <Drawer
        open={isExpenseDrawerOpen}
        onOpenChange={(open) => {
          setIsExpenseDrawerOpen(open);
          if (!open) resetExpenseDraft();
        }}
      >
        <DrawerContent
          showHandle={false}
          className="flex min-h-[280px] flex-col bg-white px-5 py-6 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <DrawerTitle className="sr-only">추가 지출 입력</DrawerTitle>
          <div className="flex flex-col gap-4">
            <FormField
              label="지출 항목"
              value={expenseNameInput}
              onChange={setExpenseNameInput}
            />

            <FormField
              label="금액"
              value={expenseAmountInput}
              onChange={(value) => setExpenseAmountInput(extractNumbers(value))}
              placeholder="숫자만 입력하세요"
            />
          </div>

          <DrawerActions
            onCancel={() => {
              resetExpenseDraft();
              setIsExpenseDrawerOpen(false);
            }}
            onSave={() => {
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
              resetExpenseDraft();
              setIsExpenseDrawerOpen(false);
            }}
          />
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
                  <FormField
                    label="예산 항목"
                    value={item.label}
                    onChange={(value) => {
                      const newItems = [...placeExpenseItems];
                      newItems[idx] = { ...newItems[idx], label: value };
                      setPlaceExpenseItems(newItems);
                    }}
                  />

                  <FormField
                    label="금액"
                    value={item.amount}
                    onChange={(value) => {
                      const newItems = [...placeExpenseItems];
                      newItems[idx] = {
                        ...newItems[idx],
                        amount: extractNumbers(value),
                      };
                      setPlaceExpenseItems(newItems);
                    }}
                    placeholder="숫자만 입력하세요"
                  />

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

          <div className="mt-4">
            <DrawerActions
              onCancel={() => {
                setPlaceExpenseItems([{ id: "1", label: "", amount: "" }]);
                setSelectedPlaceTitle("");
                setSelectedPlaceId(null);
                setIsPlaceBudgetDrawerOpen(false);
              }}
              onSave={() => {
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
            />
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
            <EditableField
              label=""
              value={
                parseInt(editingExpenseAmountInput.replace(/,/g, ""), 10) || 0
              }
              inputValue={editingExpenseAmountInput}
              isEditing={isEditingExpenseAmount}
              onToggleEdit={() => setIsEditingExpenseAmount((prev) => !prev)}
              onInputChange={(value) =>
                setEditingExpenseAmountInput(extractNumbers(value))
              }
            />
          </div>

          <DrawerActions
            onCancel={() => {
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
            onSave={() => {
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
            cancelText="삭제"
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BudgetEditSection;
