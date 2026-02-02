import ReactionButtons from "./ReactionButtons";
import CommentButton from "./CommentButton";
import CommentModal from "./CommentModal";
import { CommentGroup } from "@/types/comment";
import { ReactionSummary, ReactionType } from "@/types/reaction";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface PlaceCardProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  authorLabel?: string;
  reactions: ReactionSummary;
  commentGroups: CommentGroup[];
  onReactionChange: (type: ReactionType) => void;
  onCommentClick?: () => void;
}

const PlaceCard = ({
  title,
  description,
  imageUrl,
  authorLabel = "작성자",
  reactions,
  commentGroups,
  onReactionChange,
  onCommentClick,
}: PlaceCardProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <div className="flex h-[327px] w-full flex-col rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <header className="flex h-[56px] w-full items-center justify-between p-1">
        <p className="h-[24px] max-w-[105px] truncate text-base font-semibold leading-5 text-[#020618]">
          {title}
        </p>
        <div className="flex h-[20px] items-center gap-2">
          <CircleUserRound className="size-5 text-slate-800" strokeWidth={2.4} />
          <span className="text-sm font-semibold text-slate-800">
            {authorLabel}
          </span>
        </div>
      </header>

      <main className="flex h-[211px] flex-col gap-3">
        <div className="relative h-[139px] w-[280px] overflow-hidden bg-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized
            />
          ) : (
            <div className="flex h-[139px] w-[280px] items-center justify-center text-sm text-slate-400">
              이미지가 없습니다
            </div>
          )}
        </div>

        <p className="text-base leading-relaxed text-slate-500">
          {description}
        </p>
      </main>

      <footer className="flex h-[60px] items-center justify-between gap-4">
        <ReactionButtons reactions={reactions} onSelect={onReactionChange} />
        <CommentButton
          count={reactions.commentCount}
          onClick={() => {
            setIsCommentOpen(true);
            onCommentClick?.();
          }}
        />
      </footer>
      <CommentModal
        open={isCommentOpen}
        onOpenChange={setIsCommentOpen}
        groups={commentGroups}
      />
    </div>
  );
};

export default PlaceCard;
