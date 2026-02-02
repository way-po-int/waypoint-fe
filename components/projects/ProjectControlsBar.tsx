"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { calculateTravelDuration, getTotalTripDays } from "@/utils/date";
import { ChevronRight, Map, Route } from "lucide-react";
import DayPickerDrawer from "./DayPickerDrawer";
import { useState } from "react";

interface ProjectControlsBarProps {
  title: string;
  startDate: string;
  endDate: string;
  editButtonLabel: string;
  onToggleEdit: () => void;

  // DAY 제어
  selectedDay: number;
  onChangeDay: (day: number) => void;

  // 지도 스위치
  showMap?: boolean;
  isMapVisible?: boolean;
  onToggleMap?: (checked: boolean) => void;
}

const ProjectControlsBar = ({
  title,
  startDate,
  endDate,
  editButtonLabel = "편집하기",
  onToggleEdit,
  selectedDay,
  onChangeDay,
  showMap = true,
  isMapVisible,
  onToggleMap,
}: ProjectControlsBarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tempDay, setTempDay] = useState(1);

  const totalDays = getTotalTripDays(startDate, endDate);

  // 날짜 선택 Drawer 핸들러
  const handleOpenDayPicker = () => {
    setTempDay(selectedDay);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-7.5 z-10">
      {/* 플랜 title + 여행 일 수 + 편집 토글 버튼 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-3.5">
            <h2 className="text-xl font-bold truncate">{title}</h2>
            <p className="text-sm text-slate-400 font-semibold shrink-0">
              {calculateTravelDuration(startDate, endDate)}
            </p>
          </div>
        </div>
        <Button variant="default" size="sm" onClick={onToggleEdit}>
          {editButtonLabel}
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <Route className="size-4 text-white" strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            {/* DAY 선택 버튼 */}
            <Button
              variant="ghost"
              className="text-lg font-bold w-fit h-fit py-0 has-[>svg]:px-0 gap-1 hover:bg-transparent hover:text-inherit"
              onClick={handleOpenDayPicker}
            >
              DAY {selectedDay} <ChevronRight className="size-6" />
            </Button>
            <p className="text-sm text-muted-foreground">하루를 계획해보세요</p>
          </div>

          <DayPickerDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            totalDays={totalDays}
            tempDay={tempDay}
            onChangeTempDay={setTempDay}
            onConfirm={() => onChangeDay(tempDay)}
          />
        </div>

        {/* 지도 토글 스위치: 플랜이 추가되었을 경우 보임 */}
        {showMap && (
          <div className="flex items-center space-x-1">
            <Label htmlFor="map-mode">
              <Map className="size-4" strokeWidth={3} />
            </Label>
            <Switch
              id="map-mode"
              checked={isMapVisible}
              onCheckedChange={onToggleMap}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectControlsBar;
