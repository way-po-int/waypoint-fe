"use client";

import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const navItems = [
    {
      icon: <DiamondIcon isActive={true} />,
      label: "컬렉션",
      path: "/home",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "프로젝트",
      path: "/projects",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "마이",
      path: "/my",
    },
  ];

  const handleCollectionCreate = () => {
    router.push("/home/create");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더: LOGO + 알림 버튼 */}
      <Header variant="logo" showNotificationButton />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col p-4">
        <div className="flex flex-col flex-1 items-center justify-center gap-20">
          <h2 className="text-xl font-bold text-center">
            새 컬렉션을 추가해보세요.
          </h2>

          <Button onClick={handleCollectionCreate} className="w-full">
            컬렉션 추가하기
          </Button>
        </div>
      </main>

      {/* 네비게이션 바 */}
      <NavigationBar items={navItems} />
    </div>
  );
};

export default HomePage;
