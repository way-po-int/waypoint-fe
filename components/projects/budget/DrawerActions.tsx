"use client";

import { Button } from "@/components/ui/button";

interface DrawerActionsProps {
  onCancel: () => void;
  onSave: () => void;
  cancelText?: string;
  saveText?: string;
  saveDisabled?: boolean;
}

export const DrawerActions = ({
  onCancel,
  onSave,
  cancelText = "취소",
  saveText = "저장",
  saveDisabled = false,
}: DrawerActionsProps) => {
  return (
    <div className="mt-auto flex h-10 gap-4">
      <Button
        type="button"
        variant="outline"
        size="default"
        className="h-10 flex-1 rounded-[6px] border-[#E4E4E7] px-[17px] py-[9.5px] text-sm font-medium leading-5 text-[#09090B]"
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        type="button"
        variant="default"
        size="default"
        disabled={saveDisabled}
        className="h-10 flex-1 rounded-[6px] bg-[#18181B] px-4 py-[9.5px] text-sm font-medium leading-5 text-[#FAFAFA] disabled:opacity-50 disabled:pointer-events-none"
        onClick={onSave}
      >
        {saveText}
      </Button>
    </div>
  );
};
