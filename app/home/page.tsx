"use client";

import CollectionCard from "@/components/collection/CollectionCard";
import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { Button } from "@/components/ui/button";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";
import { useRouter } from "next/navigation";

type CollectionId = Collection["collectionId"];

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

  // TODO: 추후 Collections(GET) API 연동
  const collections = collectionMockData;

  // 컬렉션이 없을 경우
  const isEmpty = collections.length === 0;

  // 컬렉션 추가 버튼 핸들러
  const handleCollectionCreate = () => {
    router.push("/home/create");
  };

  // 컬렉션 카드 핸들러
  const handleCollectionCard = (id: CollectionId) => {
    // TODO: 컬렉션 페이지로 이동
    console.log("컬렉션 페이지로 이동", id);
  };

  // 컬렉션 수정 핸들러
  const handleEdit = (id: CollectionId) => {
    // TODO: 수정 페이지로 이동
    console.log("컬렉션 수정 페이지로 이동", id);
  };

  // 컬렉션 삭제 핸들러
  const handleDelete = (id: CollectionId) => {
    // TODO: 삭제 Dialog 열기
    console.log("컬렉션 삭제 Dialog 열기", id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더: LOGO + 알림 버튼 */}
      <Header
        variant="logo"
        showNotificationButton
        className="fixed top-0 z-10 left-1/2 -translate-x-1/2 max-w-[375px]"
      />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col p-4 mt-16 mb-40">
        {isEmpty ? (
          // 컬렉션이 없을 경우
          <div className="flex flex-col flex-1 items-center justify-center gap-20">
            {/* 타이틀 */}
            <h2 className="text-xl font-bold text-center">
              새 컬렉션을 추가해보세요.
            </h2>

            {/* 컬렉션 추가 버튼 */}
            <Button onClick={handleCollectionCreate} className="w-full">
              컬렉션 추가하기
            </Button>
          </div>
        ) : (
          // 컬렉션이 있을 경우
          <div className="flex flex-1 flex-col">
            {/* 타이틀 */}
            <h2 className="sticky top-14 z-10 bg-white py-2 text-lg font-semibold text-gray-900">
              내 컬렉션
            </h2>

            {/* 컬렉션 리스트 */}
            <div className="flex-1 overflow-y-auto">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.collectionId}
                  collection={collection}
                  onCardClick={handleCollectionCard}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* 하단 고정 컬렉션 추가 버튼 */}
            <div className="p-4 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 max-w-[375px] w-full">
              <Button onClick={handleCollectionCreate} className="w-full">
                컬렉션 추가하기
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* 네비게이션 바 */}
      <NavigationBar
        items={navItems}
        className="fixed bottom-0 z-10 left-1/2 -translate-x-1/2 max-w-[375px]"
      />
    </div>
  );
};

export default HomePage;
