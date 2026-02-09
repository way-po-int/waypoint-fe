import { ReactNode } from "react";

interface ReactionTabProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const ReactionTab = ({
  label,
  icon,
  active = false,
  onClick,
}: ReactionTabProps) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-[32px] w-fit items-center gap-[6px] rounded-(--radius) border px-3 py-0 text-sm font-semibold ${
        active
          ? "border-[#1E293B] bg-[#E2E8F0] text-[#1E293B]"
          : "border-[#94A3B8] bg-[#FFFFFF] text-slate-400"
      }`}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
};

export default ReactionTab;
