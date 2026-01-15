"use client";

import CollectionDetailPageFooter from "@/components/collection/detailpage/CollectionDetailPageFooter";
import CollectionDetailPageHeader from "@/components/collection/detailpage/CollectionDetailPageHeader";
import PlaceCard from "@/components/collection/detailpage/PlaceCard";
import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";
import { useParams } from "next/navigation";
import { useState } from "react";

const CollectionPage = () => {
  const params = useParams();
  const collectionId = params.id as string;
  const [collection, setCollection] = useState<Collection | null>(
    collectionMockData.find(
      (collection) => collection.collectionId === parseInt(collectionId)
    ) || null
  );

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

  return (
    <div className="w-[375px] h-screen overflow-hidden">
      {/* header */}
      <Header
        variant="center"
        title={collection?.title || ""}
        showBackButton
        showNotificationButton
        className="fixed top-0 z-10"
      />
      <CollectionDetailPageHeader />
      {collection?.places.length !== 0 ? (
        <main className="flex flex-col gap-3 pt-[116px] pb-[160px] px-5 h-full overflow-y-auto">
          {collection?.places.map((place) => (
            <PlaceCard key={place.placeName} place={place} />
          ))}
        </main>
      ) : (
        <main className="pt-[116px] pb-[160px] h-full flex items-center justify-center">
          <h3 className="text-center text-lg font-bold">
            현재 추가된 <br />
            장소가 없습니다.
          </h3>
        </main>
      )}

      {/* fotter */}
      <CollectionDetailPageFooter />
      <NavigationBar items={navItems} className="fixed bottom-0 w-[375px]" />
    </div>
  );
};

export default CollectionPage;
