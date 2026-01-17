"use client";

import Divider from "@/components/common/Divider";
import { Button } from "@/components/ui/button";
import { DrawerTitle } from "@/components/ui/drawer";
import { useState } from "react";
import MemberListItem from "./MemberListItem";
import InviteMemberDialog from "./InviteMemberDialog";

interface TravelMembersSectionProps {
  members: string[];
}

const TravelMembersSection = ({ members }: TravelMembersSectionProps) => {
  const [isManageMode, setIsManageMode] = useState<boolean>(false);
  const inviteLink = "http://aaa.bb/Dkdsg7xcbjfsdD";
  const handleRemoveMember = (member: string) => {
    console.log(`${member} 내보내기 클릭됨`);
    //TODO: 내보내기 기능 구현
  };

  const handleMakeOwner = (member: string) => {
    console.log(`${member} 컬렉션 소유자로 지정 클릭됨`);
    //TODO: 컬렉션 소유자로 지정 기능 구현
  };
  return (
    <div className="flex flex-col gap-2 mt-2 px-2">
      <DrawerTitle className="flex items-center justify-between gap-2">
        <p className="text-base font-bold">여행 멤버</p>
        {!isManageMode && (
          <Button variant="outline" onClick={() => setIsManageMode(true)}>
            관리
          </Button>
        )}
      </DrawerTitle>
      <div className="flex flex-col gap-3 rounded-1.5 border border-[#e4e4e7] p-4">
        <div className="flex flex-col p-1">
          <div className="p-2">
            <p className=" text-[#71717a] text-xs">여행 멤버</p>
          </div>
          {members.map((member) => (
            <MemberListItem
              key={member}
              member={member}
              isManageMode={isManageMode}
              onRemove={handleRemoveMember}
              onMakeOwner={handleMakeOwner}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          <Divider />
          <InviteMemberDialog inviteLink={inviteLink} />
        </div>
      </div>
    </div>
  );
};

export default TravelMembersSection;
