"use client";

import CollectionCard from "@/components/collection/CollectionCard";
import BottomFixedButton from "@/components/common/BottomFixedButton";
import Header from "@/components/layout/Header";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type CollectionId = Collection["collection_id"];

const ImportCollectionPage = () => {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const searchParams = useSearchParams();

  const projectId = params.projectId;
  const collections = collectionMockData;

  const rawReturnTo = searchParams.get("returnTo");

  // 선택된 컬렉션 id들 관리
  const [selectedIds, setSelectedIds] = useState<CollectionId[]>([]);

  // 선택된 컬렉션이 없는지 확인
  const isDisabled = selectedIds.length === 0;

  // 컬렉션 가져오기 완료 후 돌아갈 경로를 검증하여 반환
  const getReturnToPath = () => {
    const allowed1 = `/projects/${projectId}/edit`;
    const allowed2 = `/projects/${projectId}/collections-manage`;

    if (rawReturnTo === allowed1 || rawReturnTo === allowed2)
      return rawReturnTo;

    // returnTo가 없다면 프로젝트 페이지로 이동
    return `/projects/${projectId}`;
  };

  // 컬렉션 카드 선택 핸들러
  const handleCardSelect = (id: CollectionId) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  // 컬렉션 가져오기 핸들러
  const handleImportCollection = () => {
    if (selectedIds.length === 0) return;

    // TODO: 추후 API 연동
    console.log("선택된 컬렉션", selectedIds);

    router.replace(getReturnToPath());
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더: 타이틀 + 닫기 버튼 */}
      <Header
        variant="left"
        title="내 컬렉션"
        showCloseButton
        onClose={() => router.replace(getReturnToPath())}
        className="fixed top-0 z-10 inset-x-0 bg-white"
      />

      {/* 컬렉션 카드 */}
      <main className="flex flex-col p-4 mt-10 mb-20">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.collection_id}
            variant="select"
            collection={collection}
            selected={selectedIds.includes(collection.collection_id)}
            onCardSelect={handleCardSelect}
          />
        ))}
      </main>

      {/* 하단 고정 버튼 */}
      <BottomFixedButton
        label="컬렉션 가져오기"
        onClick={handleImportCollection}
        showShadow
        disabled={isDisabled}
      />
    </div>
  );
};

export default ImportCollectionPage;
