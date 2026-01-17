"use client";

import Divider from "@/components/common/Divider";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, X } from "lucide-react";
import { useState } from "react";

interface CollectionDetailSidebarProps {
  members: string[];
}

const CollectionDetailSidebar = ({ members }: CollectionDetailSidebarProps) => {
  const [isManageBtnClicked, setIsManageBtnClicked] = useState<boolean>(false);

  const handleRemoveMember = (member: string) => {
    console.log(`${member} 내보내기 클릭됨`);
    //TODO: 내보내기 기능 구현
  };

  const handleMakeOwner = (member: string) => {
    console.log(`${member} 컬렉션 소유자로 지정 클릭됨`);
    //TODO: 컬렉션 소유자로 지정 기능 구현
  };

  return (
    <DrawerContent>
      <DrawerHeader className="flex items-end w-full p-3">
        <DrawerClose asChild>
          <Button variant="ghost" className="w-6 h-6">
            <X className="size-6" />
          </Button>
        </DrawerClose>
      </DrawerHeader>
      <div className="flex flex-col gap-2 mt-2 px-2">
        <DrawerTitle className="flex items-center justify-between gap-2">
          <p className="text-base font-bold">여행 멤버</p>
          {!isManageBtnClicked && (
            <Button
              variant="outline"
              onClick={() => setIsManageBtnClicked(true)}
            >
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
              <div key={member} className="flex justify-between items-center">
                <div className="p-2 flex gap-2">
                  <div className="size-5 rounded-full bg-[#d9d9d9]" />
                  <p className="text-sm font-normal">{member}</p>
                </div>
                {isManageBtnClicked && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-6 h-6">
                        <EllipsisIcon className="size-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-sm font-semibold"
                        onClick={() => handleRemoveMember(member)}
                      >
                        내보내기
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>컬렉션 소유자로 지정</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <Divider />
            <Button className="w-full bg-slate-300 text-gray-900">
              초대하기
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold">이제 여행갈 준비가 되셨나요?</h3>
          <Button className="py-3 px-8">이 컬렉션으로 여행계획 시작하기</Button>
        </div>
      </div>
    </DrawerContent>
  );
};

export default CollectionDetailSidebar;
