"use client";

import { Check, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "./utils";

interface EditableFieldProps {
  label: string;
  value: string | number;
  inputValue: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  onInputChange: (value: string) => void;
  placeholder?: string;
  displayAsNumber?: boolean;
}

export const EditableField = ({
  label,
  value,
  inputValue,
  isEditing,
  onToggleEdit,
  onInputChange,
  placeholder = "숫자만 입력하세요",
  displayAsNumber = true,
}: EditableFieldProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-[#111827]">{label}</p>
        <div className="flex h-10 items-center">
          {isEditing ? (
            <Input
              value={inputValue}
              onChange={(event) => onInputChange(event.target.value)}
              placeholder={placeholder}
              className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          ) : (
            <p className="text-lg font-semibold leading-6 text-[#111827]">
              {displayAsNumber && typeof value === "number"
                ? formatCurrency(value)
                : value}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        className="mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#18181B] p-2"
        onClick={onToggleEdit}
      >
        {isEditing ? (
          <Check className="h-6 w-6 text-white" />
        ) : (
          <Pencil className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
};
