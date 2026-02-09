"use client";

import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormField = ({
  label,
  value,
  onChange,
  placeholder = "Input Value",
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium leading-5 text-[#111827]">{label}</p>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-lg font-semibold leading-6 text-[#111827] placeholder:text-sm placeholder:font-normal placeholder:text-[#9CA3AF]"
      />
    </div>
  );
};
