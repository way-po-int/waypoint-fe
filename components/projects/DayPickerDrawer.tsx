"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import DayWheelPicker from "./DayWheelPicker";
import { useEffect, useRef } from "react";

interface DayPickerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalDays: number;
  tempDay: number;
  onChangeTempDay: (day: number) => void;
  onConfirm: () => void;
}

const DayPickerDrawer = ({
  open,
  onOpenChange,
  totalDays,
  tempDay,
  onChangeTempDay,
  onConfirm,
}: DayPickerDrawerProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      contentRef.current?.focus();
    });
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        ref={contentRef}
        tabIndex={-1}
        className="p-5 [&>div:first-child]:hidden data-[vaul-drawer-direction=bottom]:rounded-t-none"
      >
        <DrawerHeader className="p-0">
          <DrawerTitle className="sr-only">여행 날짜 선택</DrawerTitle>
          <DrawerDescription className="sr-only">
            여행 일차를 선택하세요.
          </DrawerDescription>
        </DrawerHeader>

        <DayWheelPicker
          totalDays={totalDays}
          selectedDay={tempDay}
          onChange={onChangeTempDay}
        />

        <DrawerFooter className="px-0 pt-4 pb-0">
          <Button
            onClick={() => {
              onConfirm(); // 확정
              onOpenChange(false); // 닫기
            }}
          >
            완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DayPickerDrawer;
