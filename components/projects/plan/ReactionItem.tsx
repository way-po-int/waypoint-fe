import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ReactionItemProps {
  count: number;
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

const ReactionItem = ({
  count,
  active,
  label,
  icon,
  onClick,
}: ReactionItemProps) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-[32px] w-[56px] items-center gap-[6px] rounded-[var(--radius)] bg-[#FFFFFF] px-2 py-0",
        active ? "text-slate-900" : "text-slate-400",
      )}
    >
      {icon}
      <span className="text-base font-semibold">{count}</span>
    </button>
  );
};

export default ReactionItem;
