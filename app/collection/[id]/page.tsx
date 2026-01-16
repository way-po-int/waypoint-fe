"use client";

import CollectionDetailPageFooter from "@/components/collection/detailpage/CollectionDetailPageFooter";
import CollectionDetailPageHeader from "@/components/collection/detailpage/CollectionDetailPageHeader";
import PlaceCard from "@/components/collection/detailpage/PlaceCard";
import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

const CollectionPage = () => {
  const params = useParams();
  const collectionId = params.id as string;
  const [collection, setCollection] = useState<Collection | null>(
    collectionMockData.find(
      (collection) => collection.collectionId === parseInt(collectionId)
    ) || null
  );
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | string>("latest");

  const sortedPlaces = useMemo(() => {
    if (!collection?.places) return [];

    const places = [...collection.places];

    // TODO: Place 타입에 추가한 멤버(addedBy)와 날짜(addedAt) 정보가 추가되면 실제 정렬 로직 구현
    // 현재는 구조만 준비
    switch (sortBy) {
      case "latest":
        // 최신 순: addedAt 기준 내림차순
        // return places.sort((a, b) => b.addedAt - a.addedAt);
        return places;
      case "oldest":
        // 오래된 순: addedAt 기준 오름차순
        // return places.sort((a, b) => a.addedAt - b.addedAt);
        return places;
      default:
        // 멤버별 필터링: addedBy === sortBy인 장소만
        // return places.filter((place) => place.addedBy === sortBy);
        return places;
    }
  }, [collection?.places, sortBy]);

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
      <CollectionDetailPageHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        members={collection?.members || []}
      />
      {sortedPlaces.length !== 0 ? (
        <main className="flex flex-col gap-3 pt-[116px] pb-[160px] px-5 h-full overflow-y-auto">
          {sortedPlaces.map((place) => (
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
