"use client";

import { Button } from "../ui/button";

interface BottomFixedButtonProps {
  label: string;
  onClick: () => void;
  // 스타일
  showShadow?: boolean;
  className?: string;
}

const BottomFixedButton = ({
  label,
  onClick,
  showShadow = true,
  className = "",
}: BottomFixedButtonProps) => {
  return (
    <div
      className={`p-4 bg-white fixed inset-x-0 bottom-0 w-full ${showShadow ? "shadow-[0_-4px_16px_0_rgba(0,0,0,0.1)]" : ""} ${className}`}
    >
      <Button onClick={onClick} className="w-full">
        {label}
      </Button>
    </div>
  );
};

export default BottomFixedButton;
