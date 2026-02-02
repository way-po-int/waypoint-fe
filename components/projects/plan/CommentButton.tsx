import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface CommentButtonProps {
  count: number;
  onClick?: () => void;
  className?: string;
}

const CommentButton = ({ count, onClick, className }: CommentButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`flex h-[32px] w-[57px] items-center gap-[6px] rounded-[var(--radius)] border border-[1px] border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0 text-slate-700 ${className ?? ""}`}
    >
      <MessageCircle className="size-5" strokeWidth={2.4} />
      <span className="text-base font-semibold">{count}</span>
    </Button>
  );
};

export default CommentButton;
