"use client";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateRange, parseDateRange } from "@/utils/date";

const ProjectCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState(
    formatDateRange(
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 3))
    )
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(
    undefined
  );
  const [numberOfPeople, setNumberOfPeople] = useState<number | "">("");

  useEffect(() => {
    if (dialogOpen) {
      setDraftRange(parseDateRange(dateRange));
    }
  }, [dialogOpen, dateRange]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCreateProject = () => {
    console.log("여행 플랜 만들기");
    // TODO: 추후 Project(POST) API 연동
    router.push("/projects");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        variant="left"
        showBackButton
        showNotificationButton
        showBackground={false}
        className="fixed top-0 z-10 inset-x-0"
      />
      <main>
        <h2 className="text-2xl font-semibold text-black leading-tight mt-28 ml-5">
          여행 시작을 위한 <br /> 플래닝을 시작해보세요
        </h2>
        <form className="flex flex-col gap-11 mt-12 mx-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">여행명을 입력하세요</Label>
            <Input
              type="text"
              id="title"
              placeholder="제주도 여행"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">여행 일자 설정</Label>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    id="dateRange"
                    placeholder="Input Value"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    readOnly
                  />
                  <InputGroupAddon align="inline-end">
                    <CalendarIcon className="size-5" />
                  </InputGroupAddon>
                </InputGroup>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="flex flex-col gap-7"
              >
                <div className="space-y-4 mb-0">
                  <DialogTitle>여행 날짜를 입력해주세요</DialogTitle>
                  <DialogDescription>
                    여행 출발일과 도착일을 지정해주세요
                  </DialogDescription>
                </div>
                <Calendar
                  mode="range"
                  selected={draftRange}
                  onSelect={setDraftRange}
                  disabled={{ before: today }}
                  className="w-full border border-[#e4e4e7] rounded-[6px] p-3"
                />
                <Button
                  type="button"
                  className="w-22 h-10 ml-auto"
                  disabled={!draftRange?.from || !draftRange?.to}
                  onClick={() => {
                    if (draftRange?.from && draftRange?.to) {
                      setDateRange(
                        formatDateRange(draftRange.from, draftRange.to)
                      );
                      setDialogOpen(false);
                    }
                  }}
                >
                  입력 완료
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              몇 명이서 여행하시나요?
            </Label>
            <Input
              type="number"
              id="numberOfPeople"
              placeholder="2"
              value={numberOfPeople}
              onChange={(e) =>
                setNumberOfPeople(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
          <Button
            type="button"
            className="w-full h-11"
            disabled={
              !title ||
              !dateRange ||
              numberOfPeople === "" ||
              numberOfPeople <= 0
            }
            onClick={handleCreateProject}
          >
            여행 플랜 만들기
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ProjectCreatePage;
