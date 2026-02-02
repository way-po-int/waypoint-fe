import { ReactNode } from "react";

interface ReactionGroupProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ReactionGroup = ({ children, onClick }: ReactionGroupProps) => {
  return (
    <div
      className="flex h-[32px] w-[168px] items-center gap-0"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ReactionGroup;
