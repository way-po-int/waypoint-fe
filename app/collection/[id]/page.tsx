"use client";

import CollectionDetailPageHeader from "@/components/collection/detailpage/CollectionDetailPageHeader";
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
    <div>
      <Header
        variant="center"
        title={collection?.title || ""}
        showBackButton
        showNotificationButton
				className="fixed top-0 z-10"
      />
      <CollectionDetailPageHeader />
      <NavigationBar items={navItems} className="fixed bottom-0 w-full"/>
      {/* fotter */}
      <CollectionDetailPageFooter />
      <NavigationBar items={navItems} className="fixed bottom-0 w-[375px]" />
    </div>
  );
};

export default CollectionPage;
