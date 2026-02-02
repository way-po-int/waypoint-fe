import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactionType } from "@/types/reaction";
import { Angry, Laugh, Smile, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactionTab from "./ReactionTab";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ReactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReaction?: ReactionType | null;
}

const reactionOptions: Array<{
  type: ReactionType;
  label: string;
  Icon: typeof Smile;
}> = [
  { type: "prefer", label: "선호해요", Icon: Laugh },
  { type: "available", label: "가능해요", Icon: Smile },
  { type: "unavailable", label: "불가능해요", Icon: Angry },
];

const reactionChipsByType: Record<ReactionType, string[]> = {
  prefer: [
    "현지 분위기를 느낄 수 있어요",
    "명소로 유명해요",
    "역사적으로 의미있어요",
    "기념으로 남기기 좋아요",
    "관심 있는 관광 테마예요",
    "기대되는 관광지예요",
    "여유 있게 즐기기 좋아요",
    "꼭 가보고 싶어요",
    "사진 찍기 좋아요",
    "대화하기 좋아요",
    "직접 입력",
  ],
  available: [
    "동선에 벗어나지 않아요",
    "가볍게 들르기 좋아요",
    "날씨가 괜찮다면 좋아요",
    "동행자가 원하면 좋아요",
    "고민 중이에요",
    "날씨에 따라 달라요",
    "체력에 따라 달라요",
    "한 번은 가보고 싶어요",
    "더 좋은 대안이 있다면 비교해보고 싶어요",
    "직접 입력",
  ],
  unavailable: [
    "관광지 성격이 저와 맞지 않아요",
    "사람이 많을 것 같아요",
    "이미 가본 적이 있어요",
    "이동 시간이 길어요",
    "체력 소모가 커요",
    "일정 대비 만족도가 낮아요",
    "비용이 비싸요",
    "여행 목적과 맞지 않아요",
    "직접 입력",
  ],
};

const initialReaction = (r?: ReactionType | null): ReactionType =>
  r ?? "prefer";

function ReactionModalBody({
  initialReaction: initial,
  onOpenChange,
  onDirectInputChange,
}: {
  initialReaction: ReactionType;
  onOpenChange: (open: boolean) => void;
  onDirectInputChange: (open: boolean) => void;
}) {
  const [currentReaction, setCurrentReaction] =
    useState<ReactionType>(initial);
  const [selectedChips, setSelectedChips] = useState<
    Record<ReactionType, string[]>
  >({
    prefer: [],
    available: [],
    unavailable: [],
  });
  const reactionChips = reactionChipsByType[currentReaction];
  const activeChips = selectedChips[currentReaction];
  const isDirectInputOpen = activeChips.includes("직접 입력");

  useEffect(() => {
    onDirectInputChange(isDirectInputOpen);
  }, [isDirectInputOpen, onDirectInputChange]);

  const handleChipToggle = (chip: string) => {
    setSelectedChips((prev) => {
      const current = prev[currentReaction];
      const exists = current.includes(chip);
      const next = exists
        ? current.filter((item) => item !== chip)
        : [...current, chip];
      return { ...prev, [currentReaction]: next };
    });
  };

  return (
    <>
      <header className="flex h-[107px] flex-col gap-[4px] px-6 pb-[11px] pt-6">
        <DialogTitle className="h-[28px] w-[327px] text-xl font-semibold leading-7 text-[#18181B]">
          장소에 대한 의견을 적어주세요
        </DialogTitle>
        <p className="h-[40px] w-[175px] text-sm font-normal leading-5 text-[#62748E]">
          의견을 함께 남기면 팀원들의
          <br />
          생각을 쉽게 이해할 수 있어요.
        </p>
      </header>

      <section className="flex h-[54.2744px] w-[375px] items-center gap-[4px] px-6 py-2">
        <div className="flex h-[38.2744px] w-[327px] flex-col gap-[14px] border-b border-[#D9D9D9]">
          <div className="flex h-[24px] w-[327px] items-center justify-between">
            <div className="flex h-[24px] w-[327px] items-center justify-between">
              {reactionOptions.map(({ type, label, Icon }) => {
                const active = currentReaction === type;
                const activeColor =
                  type === "unavailable" ? "text-[#EF4444]" : "text-[#1E293B]";
                const inactiveText = "text-slate-400";
                const inactiveIcon = "text-slate-300";

                const handleReactionChange = () => {
                  setCurrentReaction(type);
                  setSelectedChips({
                    prefer: [],
                    available: [],
                    unavailable: [],
                  });
                };

                return (
                  <button
                    type="button"
                    key={type}
                    aria-pressed={active}
                    onClick={handleReactionChange}
                    className={cn(
                      "flex h-[24px] w-[93px] items-center gap-[4px] text-sm font-bold leading-5 text-[#1E293B]",
                      active ? activeColor : inactiveText,
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-6",
                        active ? activeColor : inactiveIcon,
                      )}
                      strokeWidth={2.4}
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className={`flex w-[375px] flex-col gap-[6px] px-6 pb-4 transition-[height] duration-200 ease-out ${
          isDirectInputOpen ? "h-[329px]" : "h-[238px]"
        }`}
      >
        <div className="flex flex-wrap gap-[6px]">
          {reactionChips.map((chip) => (
            <ReactionTab
              key={chip}
              label={chip}
              active={activeChips.includes(chip)}
              onClick={() => handleChipToggle(chip)}
              icon={
                chip === "직접 입력" ? (
                  <Pencil className="size-4" strokeWidth={2.2} />
                ) : undefined
              }
            />
          ))}
        </div>
        {isDirectInputOpen && (
          <Textarea
            className="h-[80px] w-[335px] rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm"
          />
        )}
      </section>

      <footer className="flex h-[56px] items-center justify-end gap-2 px-6 pb-6 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="h-[32px] w-[50px] gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-slate-900"
          onClick={() => onOpenChange(false)}
        >
          취소
        </Button>
        <Button
          size="sm"
          className="h-[32px] w-[80px] gap-[6px] rounded-(--radius) bg-[#18181B] px-3 py-0 text-white hover:bg-[#18181B]"
        >
          입력 완료
        </Button>
      </footer>
    </>
  );
}

const ReactionModal = ({
  open,
  onOpenChange,
  selectedReaction,
}: ReactionModalProps) => {
  const initial = initialReaction(selectedReaction);
  const [isDirectInputOpen, setIsDirectInputOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={`w-[375px] gap-[4px] rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-[height] duration-200 ease-out will-change-[height] ${
          isDirectInputOpen ? "h-[558.2744px]" : "h-[467.2744px]"
        }`}
      >
        {open ? (
          <ReactionModalBody
            key={initial}
            initialReaction={initial}
            onOpenChange={onOpenChange}
            onDirectInputChange={setIsDirectInputOpen}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ReactionModal;
