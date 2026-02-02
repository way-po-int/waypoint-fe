import { ReactNode } from "react";

interface ReactionTabProps {
  label: string;
  icon?: ReactNode;
}

const ReactionTab = ({ label, icon }: ReactionTabProps) => {
  return (
    <div className="flex h-[32px] w-fit items-center gap-[6px] rounded-[var(--radius)] border border-[1px] border-[#94A3B8] bg-[#FFFFFF] px-3 py-0 text-sm font-semibold text-slate-400">
      <span>{label}</span>
      {icon}
    </div>
  );
};

export default ReactionTab;
