"use client";

import MemberActionsDropdown from "./MemberActionsDropdown";

interface MemberListItemProps {
  member: string;
  isManageMode: boolean;
  onRemove: (member: string) => void;
  onMakeOwner: (member: string) => void;
}

const MemberListItem = ({
  member,
  isManageMode,
  onRemove,
  onMakeOwner,
}: MemberListItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="p-2 flex gap-2">
        <div className="size-5 rounded-full bg-[#d9d9d9]" />
        <p className="text-sm font-normal">{member}</p>
      </div>
      {isManageMode && (
        <MemberActionsDropdown
          member={member}
          onRemove={onRemove}
          onMakeOwner={onMakeOwner}
        />
      )}
    </div>
  );
};

export default MemberListItem;
