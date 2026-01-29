"use client";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import DayWheelPicker from "./DayWheelPicker";

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
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-5 [&>div:first-child]:hidden data-[vaul-drawer-direction=bottom]:rounded-t-none">
        <DrawerHeader className="p-0">
          <DrawerTitle className="sr-only">여행 날짜 선택</DrawerTitle>
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
