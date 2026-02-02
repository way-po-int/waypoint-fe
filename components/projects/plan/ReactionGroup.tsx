import { ReactNode } from "react";

interface ReactionGroupProps {
  children: ReactNode;
}

const ReactionGroup = ({ children }: ReactionGroupProps) => {
  return (
    <div className="flex h-[32px] w-[168px] items-center gap-0">
      {children}
    </div>
  );
};

export default ReactionGroup;
