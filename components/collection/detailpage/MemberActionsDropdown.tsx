"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

interface MemberActionsDropdownProps {
  member: string;
  onRemove: (member: string) => void;
  onMakeOwner: (member: string) => void;
}

const MemberActionsDropdown = ({
  member,
  onRemove,
  onMakeOwner,
}: MemberActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-6 h-6">
          <EllipsisIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-sm font-semibold"
          onClick={() => onRemove(member)}
        >
          내보내기
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onMakeOwner(member)}>
          컬렉션 소유자로 지정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActionsDropdown;
