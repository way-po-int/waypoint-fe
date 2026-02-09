import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";

interface FreeTimeCardProps {
  memo?: string;
}

const FreeTimeCard = ({ memo }: FreeTimeCardProps) => {
  return (
    <Card className="h-[116px] w-full gap-0 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <CardHeader className="flex h-[72px] w-full items-center justify-between p-6">
        <CardTitle className="h-[24px] max-w-[105px] truncate text-base font-semibold leading-5 text-[#020618]">
          자유시간
        </CardTitle>
        <div className="flex h-[20px] items-center gap-2 text-slate-800">
          <CircleUserRound className="size-5" strokeWidth={2.4} />
          <span className="text-sm font-semibold">작성자</span>
        </div>
      </CardHeader>
      <CardContent className="flex h-[44px] w-full flex-col gap-2 px-6 pb-6 pt-0">
        <p className="text-sm text-slate-500">
          {memo || "한 시간 후에 --에서 만나자"}
        </p>
      </CardContent>
    </Card>
  );
};

export default FreeTimeCard;
