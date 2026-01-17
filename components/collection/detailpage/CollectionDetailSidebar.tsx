"use client";

import Divider from "@/components/common/Divider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Copy, EllipsisIcon, UserPlusIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CollectionDetailSidebarProps {
  members: string[];
}

const CollectionDetailSidebar = ({ members }: CollectionDetailSidebarProps) => {
  const [isManageBtnClicked, setIsManageBtnClicked] = useState<boolean>(false);
  const inviteLink = "http://aaa.bb/Dkdsg7xcbjfsdD";

  const handleRemoveMember = (member: string) => {
    console.log(`${member} 내보내기 클릭됨`);
    //TODO: 내보내기 기능 구현
  };

  const handleMakeOwner = (member: string) => {
    console.log(`${member} 컬렉션 소유자로 지정 클릭됨`);
    //TODO: 컬렉션 소유자로 지정 기능 구현
  };

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("초대 링크가 복사되었습니다", {
        icon: <Copy className="size-4" />,
        duration: 2000,
      });
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      toast.error("복사에 실패했습니다");
    }
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
                      <DropdownMenuItem onClick={() => handleMakeOwner(member)}>
                        컬렉션 소유자로 지정
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3.5">
            <Divider />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-slate-300 text-gray-900">
                  초대하기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-left">
                  <DialogTitle className="text-lg font-bold">
                    여행 멤버 초대하기
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-xs text-gray-500">
                  우리 여행에 함께할 멤버를 초대해요!
                </DialogDescription>
                <div className="flex flex-col items-center justify-center gap-7">
                  <UserPlusIcon className="size-21" strokeWidth={0.5} />
                  <p className="text-sm font-normal">{inviteLink}</p>
                  <Button className="w-full" onClick={handleCopyInviteLink}>
                    초대 링크 복사
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold">이제 여행갈 준비가 되셨나요?</h3>
          <Button className="py-3 px-8">이 컬렉션으로 여행계획 시작하기</Button>
        </div>
      </div>
      <Button className="bg-destructive text-white fixed bottom-5 left-2 right-2">
        이 컬렉션에서 나가기
      </Button>
    </DrawerContent>
  );
};

export default CollectionDetailSidebar;
