"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark, Pencil, Trash2, Vote } from "lucide-react";

interface EditTimeSlotDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateOrTimeEdit?: () => void;
  onAddCandidate?: () => void;
  onDelete?: () => void;
  isBreak?: boolean;
}

const EditTimeSlotDrawer = ({
  open,
  onOpenChange,
  onDateOrTimeEdit,
  onAddCandidate,
  onDelete,
  isBreak = false,
}: EditTimeSlotDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-5 [&>div:first-child]:hidden data-[vaul-drawer-direction=bottom]:rounded-t-none">
        <DrawerHeader className="p-0">
          <DrawerTitle className="sr-only">타임슬롯 옵션</DrawerTitle>
          <DrawerDescription className="sr-only">
            옵션을 선택하세요.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-2.5">
          {/* 날짜/시간 수정 */}
          <Button
            variant="ghost"
            onClick={onDateOrTimeEdit}
            className="justify-start hover:bg-transparent px-0 py-0 has-[>svg]:px-0"
          >
            <Pencil className="size-5" /> 날짜/시간 수정
          </Button>
          {/* 후보지 추가 */}
          {!isBreak && (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={onAddCandidate}
                className="justify-start hover:bg-transparent flex-1 has-[>svg]:px-0"
              >
                <Vote className="size-5" /> 후보지 추가하기
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent has-[>svg]:px-0"
                  >
                    <CircleQuestionMark className="size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mr-4">
                  <p>
                    같은 시간에 후보지를 추가하고, <br />
                    팀원들과 여행지를 정할 수 있습니다.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
          {/* 삭제 */}
          <Button
            variant="ghost"
            onClick={onDelete}
            className="justify-start hover:bg-transparent has-[>svg]:px-0"
          >
            <Trash2 className="size-5" /> 삭제
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditTimeSlotDrawer;
