"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Pencil } from "lucide-react";

interface MemoEditSectionProps {
  memo: string; // 저장된 메모
  draftMemo: string; // 편집 중 메모
  isEditing: boolean;
  onStartEdit: () => void;
  onFinishEdit: () => void;
  onChangeDraft: (next: string) => void;
}

const MemoEditSection = ({
  memo,
  draftMemo,
  isEditing,
  onStartEdit,
  onFinishEdit,
  onChangeDraft,
}: MemoEditSectionProps) => {
  const isCheckDisabled = draftMemo.trim().length === 0;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-1">
        <Label className="text-base font-bold flex-1">메모</Label>
        <Button
          variant="ghost"
          className="p-0 has-[>svg]:px-0 h-fit"
          onClick={isEditing ? onFinishEdit : onStartEdit}
          disabled={isEditing && isCheckDisabled}
          aria-label={isEditing ? "메모 편집 종료" : "메모 편집 시작"}
        >
          {isEditing ? (
            <Check className="size-6" />
          ) : (
            <Pencil className="size-6" />
          )}
        </Button>
      </div>

      <div className="min-h-20">
        {isEditing ? (
          <Textarea
            id="memo"
            value={draftMemo}
            onChange={(e) => onChangeDraft(e.target.value)}
          />
        ) : (
          <span className="text-sm whitespace-pre-wrap wrap-break-word">
            {memo.trim().length > 0 ? memo : "메모가 없습니다"}
          </span>
        )}
      </div>
    </div>
  );
};

export default MemoEditSection;
