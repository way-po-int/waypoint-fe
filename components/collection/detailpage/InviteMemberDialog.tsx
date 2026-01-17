"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, UserPlusIcon } from "lucide-react";
import { toast } from "sonner";

interface InviteMemberDialogProps {
  inviteLink: string;
}

const InviteMemberDialog = ({ inviteLink }: InviteMemberDialogProps) => {
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
  );
};

export default InviteMemberDialog;
