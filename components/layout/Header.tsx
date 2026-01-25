"use client";

import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
  // 헤더 레이아웃 타입
  variant?: "left" | "center" | "logo";
  // 타이틀 텍스트
  title?: string;
  // 좌측 버튼
  showBackButton?: boolean;
  onBack?: () => void;
  // 우측 버튼
  showCloseButton?: boolean;
  showNotificationButton?: boolean;
  showMoreInfoButton?: boolean;
  onClose?: () => void;
  onNotification?: () => void;
  // Drawer 컨텐츠
  drawerContent?: React.ReactNode;
  // 스타일
  showBackground?: boolean;
  className?: string;
}

const Header = ({
  variant = "left",
  title = "",
  showBackButton = false,
  showCloseButton = false,
  showNotificationButton = false,
  showMoreInfoButton = false,
  onBack,
  onClose,
  onNotification,
  drawerContent,
  showBackground = true,
  className = "",
}: HeaderProps) => {
  const router = useRouter();

  // 기본 뒤로가기 핸들러
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // 기본 닫기 핸들러
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  // 기본 알림 핸들러
  const handleNotification = () => {
    if (onNotification) {
      onNotification();
    } else {
      console.log("알림 클릭");
    }
  };

  return (
    <header
      className={`flex h-14 w-full items-center justify-between px-4 ${
        showBackground ? "bg-[#E8EBED]" : "bg-transparent"
      } ${className}`}
    >
      {/* 좌측 영역 */}
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="뒤로가기"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* 좌측 또는 중앙 타이틀 */}
        {variant === "left" && title && (
          <h1 className="text-xl font-bold">{title}</h1>
        )}

        {variant === "logo" && (
          <h1 className="text-3xl font-black tracking-tight text-[#3D4F5C]">
            LOGO
          </h1>
        )}
      </div>

      {/* 중앙 타이틀 (center variant) */}
      {variant === "center" && title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold">
          {title}
        </h1>
      )}

      {/* 우측 영역 */}
      <div className="flex items-center">
        {showNotificationButton && (
          <button
            onClick={handleNotification}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="알림"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        )}

        {showCloseButton && (
          <button
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="닫기"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {showMoreInfoButton && (
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" aria-label="더 정보">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            {drawerContent}
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
