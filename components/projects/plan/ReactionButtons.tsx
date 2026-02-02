import { ReactionSummary, ReactionType } from "@/types/reaction";
import { Angry, Laugh, Smile } from "lucide-react";
import ReactionGroup from "./ReactionGroup";
import ReactionItem from "./ReactionItem";

interface ReactionButtonsProps {
  reactions: ReactionSummary;
  onSelect: (type: ReactionType) => void;
}

const reactionMeta: Record<ReactionType, { label: string; Icon: typeof Smile }> = {
  prefer: { label: "선호", Icon: Laugh },
  available: { label: "가능", Icon: Smile },
  unavailable: { label: "불가능", Icon: Angry },
};

const ReactionButtons = ({ reactions, onSelect }: ReactionButtonsProps) => {
  return (
    <ReactionGroup>
      {(Object.keys(reactionMeta) as ReactionType[]).map((type) => {
        const { label, Icon } = reactionMeta[type];
        const active = reactions.myReaction === type;

        return (
          <ReactionItem
            key={type}
            label={label}
            count={reactions[type]}
            active={active}
            icon={
              <Icon
                className={active ? "size-6 text-slate-900" : "size-6 text-slate-300"}
                strokeWidth={2.4}
              />
            }
            onClick={() => onSelect(type)}
          />
        );
      })}
    </ReactionGroup>
  );
};

export default ReactionButtons;
