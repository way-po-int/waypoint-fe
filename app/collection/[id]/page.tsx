"use client";

import Header from "@/components/layout/Header";
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

  return (
    <div>
      <Header
        variant="center"
        title={collection?.title || ""}
        showBackButton
        showNotificationButton
      />
    </div>
  );
};

export default CollectionPage;
