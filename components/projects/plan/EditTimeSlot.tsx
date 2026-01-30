"use client";

import Divider from "@/components/common/Divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bird, ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { TimeSlot } from "@/types/block";
import Link from "next/link";
import { useParams } from "next/navigation";

interface EditTimeSlotProps {
  slot: TimeSlot;
  defaultOpen?: boolean;
  hideEndTime?: boolean;
  onOpenOptions?: (blockId?: string) => void;
}

const TimeColumn = ({
  startTime,
  endTime,
  hideEndTime,
}: {
  startTime: string;
  endTime: string;
  hideEndTime?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start justify-between h-full shrink-0">
      <p className="text-xs text-slate-700 font-medium">{startTime}</p>
      {!hideEndTime && (
        <p className="text-xs text-slate-700 font-medium">{endTime}</p>
      )}
    </div>
  );
};

const OptionButton = ({
  ariaLabel,
  onClick,
}: {
  ariaLabel: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={ariaLabel}
      className="w-fit"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
    >
      <EllipsisVertical className="size-6" />
    </Button>
  );
};

const SlotShell = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <div className={`${className} relative`}>
    <Divider className="absolute top-0 left-0 right-0 bg-slate-300" />
    {children}
  </div>
);

const SingleSlot = ({
  href,
  label,
  icon,
  optionAriaLabel,
  onOpenOptions,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  optionAriaLabel: string;
  onOpenOptions?: (blockId?: string) => void;
}) => (
  <Link href={href} className="min-w-0 flex-1 h-full">
    <SlotShell className="min-w-0 flex-1 h-full flex items-center justify-between rounded-2xl bg-slate-50 p-4">
      <span
        className={`flex-1 text-sm text-foreground font-bold ${
          icon ? "flex gap-1" : "min-w-0 truncate"
        }`}
      >
        {icon}
        {label}
      </span>
      <OptionButton
        ariaLabel={optionAriaLabel}
        onClick={() => onOpenOptions?.()}
      />
    </SlotShell>
  </Link>
);

const CandidateCard = ({
  href,
  candidate,
  index,
  onOpenOptions,
}: {
  href: string;
  candidate: { id: string; title: string };
  index: number;
  onOpenOptions?: (blockId?: string) => void;
}) => {
  return (
    <Link href={href} className="block">
      <div className="rounded-2xl bg-slate-100 p-2.5">
        <div className="space-y-1">
          <Badge className="bg-slate-500 text-slate-50">
            후보 {String(index).padStart(2, "0")}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground font-bold truncate">
            {candidate.title}
          </span>
          <OptionButton
            ariaLabel="타임슬롯 옵션"
            onClick={() => onOpenOptions?.(candidate.id)}
          />
        </div>
      </div>
    </Link>
  );
};

const CandidatesSlot = ({
  projectId,
  candidates,
  defaultOpen,
  onOpenOptions,
}: {
  projectId: string;
  candidates: { id: string; title: string }[];
  defaultOpen: boolean;
  onOpenOptions?: (blockId?: string) => void;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const [first, ...rest] = candidates;
  const count = candidates.length;

  return (
    <SlotShell className="min-w-0 flex flex-1 flex-col rounded-2xl bg-slate-300 p-1.5">
      <CandidateCard
        // TODO: 추후 프로젝트 내 장소 상세 페이지로 이동
        href={`/projects/${projectId}/place/${first.id}`}
        candidate={first}
        index={1}
        onOpenOptions={onOpenOptions}
      />
      <Accordion
        type="single"
        collapsible
        value={open ? "candidates" : ""}
        onValueChange={(v) => setOpen(v === "candidates")}
        className="mt-2 w-full"
      >
        <AccordionItem value="candidates" className="border-none">
          {/* 접혔을 때만: 텍스트 + 아래 화살표 트리거 */}
          {!open && (
            <AccordionTrigger className="flex items-center justify-center gap-1.75 px-0 py-0 text-sm font-medium text-gray-500 hover:no-underline [&>svg:last-child]:hidden">
              <span>총 {count}개의 후보지</span>
              <ChevronDown className="size-6" />
            </AccordionTrigger>
          )}
          {/* 펼쳐지는 영역 */}
          <AccordionContent className="pb-0">
            <div className="space-y-2">
              {rest.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  // TODO: 추후 프로젝트 내 장소 상세 페이지로 이동
                  href={`/projects/${projectId}/place/${c.id}`}
                  candidate={c}
                  index={i + 2}
                  onOpenOptions={onOpenOptions}
                />
              ))}
              {/* 펼쳤을 때만: 위 화살표 트리거 */}
              {open && (
                <AccordionTrigger className="flex items-center text-gray-500 justify-center py-0 [&>svg:last-child]:hidden [&[data-state=open]>svg]:rotate-0">
                  <ChevronUp className="size-6" />
                </AccordionTrigger>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SlotShell>
  );
};

const EditTimeSlot = ({
  slot,
  defaultOpen = false,
  hideEndTime = false,
  onOpenOptions,
}: EditTimeSlotProps) => {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const {
    start_time: startTime,
    end_time: endTime,
    type,
    time_slot_id: timeSlotId,
  } = slot;

  const blocks = slot.blocks ?? [];
  const blockCount = blocks.length;

  const isBreak = type === "FREE" || blockCount === 0;
  const isCandidates = type === "PLACE" && blockCount >= 2;

  const defaultTitle = blockCount === 1 ? (blocks[0]?.name ?? "") : "";
  const singlePlaceId = blocks[0]?.block_id;

  const candidates = blocks.map((b) => ({ id: b.block_id, title: b.name }));

  const wrapperClassName = isCandidates
    ? "flex w-full gap-2 items-start"
    : "flex items-center w-full gap-2 h-19";

  const timeColumnWrapperClassName = isCandidates
    ? "shrink-0 self-stretch"
    : "h-full shrink-0";

  return (
    <div className={wrapperClassName}>
      <div className={timeColumnWrapperClassName}>
        <TimeColumn
          startTime={startTime}
          endTime={endTime}
          hideEndTime={hideEndTime}
        />
      </div>

      {isBreak ? (
        <SingleSlot
          href={`/projects/${projectId}/break/${timeSlotId}`}
          label="자유시간"
          icon={<Bird className="size-5" />}
          optionAriaLabel="자유시간 옵션"
          onOpenOptions={onOpenOptions}
        />
      ) : isCandidates ? (
        <CandidatesSlot
          projectId={projectId}
          candidates={candidates}
          defaultOpen={defaultOpen}
          onOpenOptions={onOpenOptions}
        />
      ) : (
        <SingleSlot
          href={`/projects/${projectId}/place/${singlePlaceId}`}
          label={defaultTitle}
          optionAriaLabel="타임슬롯 옵션"
          onOpenOptions={onOpenOptions}
        />
      )}
    </div>
  );
};

export default EditTimeSlot;
