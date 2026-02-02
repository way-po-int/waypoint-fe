import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactionGroup from "./ReactionGroup";
import ReactionItem from "./ReactionItem";
import { Angry, Laugh, MessageCircle, Smile, CircleUserRound } from "lucide-react";

interface Candidate {
  id: string;
  title: string;
  address?: string;
  authorLabel?: string;
  reactions?: {
    prefer: number;
    available: number;
    unavailable: number;
  };
  commentCount?: number;
}

interface PlanCandidatesListProps {
  candidates: Candidate[];
}

const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const reactions = candidate.reactions ?? {
    prefer: 3,
    available: 3,
    unavailable: 3,
  };
  const commentCount = candidate.commentCount ?? 9;
  return (
    <Card className="h-[176px] w-full gap-0 rounded-lg border border-[#E2E8F0] bg-white p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <CardHeader className="flex h-[72px] w-full flex-row items-center justify-between gap-3 px-6 py-6">
        <CardTitle className="text-base font-semibold text-[#020618] truncate">
          {candidate.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-slate-800">
          <CircleUserRound className="size-5" strokeWidth={2.4} />
          <span className="text-sm font-semibold">
            {candidate.authorLabel ?? "작성자"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex h-[44px] w-full flex-col gap-2 px-6 pb-6 pt-0">
        {candidate.address && (
          <p className="text-sm text-slate-500 truncate">{candidate.address}</p>
        )}
      </CardContent>
      <div className="flex h-[60px] w-full items-center justify-between px-4 py-[14px]">
        <ReactionGroup>
          <ReactionItem
            label="선호"
            count={reactions.prefer}
            active={false}
            icon={<Laugh className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {}}
          />
          <ReactionItem
            label="가능"
            count={reactions.available}
            active={false}
            icon={<Smile className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {}}
          />
          <ReactionItem
            label="불가능"
            count={reactions.unavailable}
            active={false}
            icon={<Angry className="size-6 text-slate-300" strokeWidth={2.4} />}
            onClick={() => {}}
          />
        </ReactionGroup>
        <div className="flex h-[32px] items-center gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-slate-700">
          <MessageCircle className="size-5" strokeWidth={2.4} />
          <span className="text-base font-semibold">{commentCount}</span>
        </div>
      </div>
    </Card>
  );
};

const PlanCandidatesList = ({ candidates }: PlanCandidatesListProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="flex flex-col gap-3">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-[32px] w-full gap-[6px] rounded-(--radius) border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-sm font-medium leading-5 text-center text-[#0F172B] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      >
        후보지 선택하기
      </Button>
    </div>
  );
};

export default PlanCandidatesList;
