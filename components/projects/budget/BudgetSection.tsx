"use client";

const BudgetSection = () => {
  const totalBudget = 100000000;
  const perPersonBudget = 100000;
  const spentAmount = 10000000;

  const remainingBudget = Math.max(totalBudget - spentAmount, 0);

  const formatCurrency = (value: number) =>
    `${value.toLocaleString("ko-KR")}원`;

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
      </section>
    </div>
  );
};

export default BudgetSection;
