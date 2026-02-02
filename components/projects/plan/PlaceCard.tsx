import ReactionButtons from "./ReactionButtons";
import CommentButton from "./CommentButton";
import CommentModal from "./CommentModal";
import { CommentGroup } from "@/types/comment";
import { ReactionSummary, ReactionType } from "@/types/reaction";
import { CircleUserRound } from "lucide-react";
import { KeyboardEvent, MouseEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PlaceCardProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  authorLabel?: string;
  reactions: ReactionSummary;
  commentGroups: CommentGroup[];
  onReactionChange: (type: ReactionType) => void;
  confirmedFromCandidateCount?: number;
  onConfirmedFooterClick?: () => void;
  href?: string;
}

const PlaceCard = ({
  title,
  description,
  imageUrl,
  authorLabel = "작성자",
  reactions,
  commentGroups,
  onReactionChange,
  confirmedFromCandidateCount,
  onConfirmedFooterClick,
  href,
}: PlaceCardProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const router = useRouter();
  const hasConfirmedFooter =
    confirmedFromCandidateCount !== undefined && confirmedFromCandidateCount > 0;
  const hasComments = reactions.commentCount > 0;
  const cardClassName = href
    ? "relative z-10 flex h-[327px] w-full cursor-pointer flex-col rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    : "relative z-10 flex h-[327px] w-full flex-col rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]";

  const shouldIgnoreNavigation = (target: EventTarget | null) => {
    if (!target || !(target instanceof HTMLElement)) return false;
    return Boolean(
      target.closest(
        "button, a, input, textarea, select, [role='button'], [data-prevent-card-navigation='true']",
      ),
    );
  };

  const handleNavigate = (event: MouseEvent<HTMLDivElement>) => {
    if (!href) return;
    if (shouldIgnoreNavigation(event.target)) return;
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!href) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    if (shouldIgnoreNavigation(event.target)) return;
    event.preventDefault();
    router.push(href);
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className={cardClassName}
        role={href ? "link" : undefined}
        tabIndex={href ? 0 : undefined}
        onClick={handleNavigate}
        onKeyDown={handleKeyDown}
      >
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
              if (!hasComments) return;
              setIsCommentOpen(true);
            }}
            className={hasComments ? undefined : "opacity-50"}
          />
        </footer>
        <CommentModal
          open={isCommentOpen}
          onOpenChange={setIsCommentOpen}
          groups={commentGroups}
        />
      </div>

      {hasConfirmedFooter && (
        <button
          type="button"
          onClick={onConfirmedFooterClick}
          className="-mt-[10px] flex h-[50px] w-full items-center justify-center gap-[10px] rounded-b-lg bg-[#E5E7EB] pt-5 pb-[14px]"
        >
          <span className="text-sm font-medium text-[#9CA3AF]">
            총 {confirmedFromCandidateCount}개의 후보지 중 이 장소로
            확정되었어요.
          </span>
        </button>
      )}
    </div>
  );
};

export default PlaceCard;
