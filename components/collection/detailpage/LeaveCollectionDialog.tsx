"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LeaveCollectionDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive text-white fixed bottom-5 left-2 right-2">
          이 컬렉션에서 나가기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-8">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle className="text-sm font-semibold text-gray-500">
            컬렉션의 소유자는 나갈 수 없습니다.
            <br />
            여행멤버 관리에서 먼저 소유자를 변경해 주세요.
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            컬렉션의 소유자는 나갈 수 없습니다. 여행멤버 관리에서 먼저 소유자를 변경해 주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end">
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveCollectionDialog;
