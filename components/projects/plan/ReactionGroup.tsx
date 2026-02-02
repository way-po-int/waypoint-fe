import { ReactNode } from "react";

interface ReactionGroupProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ReactionGroup = ({ children, onClick }: ReactionGroupProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <div
      className="flex h-[32px] w-[168px] items-center gap-0"
      onClick={handleClick}
      data-prevent-card-navigation="true"
    >
      {children}
    </div>
  );
};

export default ReactionGroup;
