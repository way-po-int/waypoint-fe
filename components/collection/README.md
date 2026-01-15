# Collection Components

재사용 가능한 컬렉션 컴포넌트 모음입니다.

## CollectionCard

컬렉션 정보를 카드 형태로 표시하는 컴포넌트입니다.  
`default` / `select` 두 가지 variant를 지원합니다.

- `default`: 카드 클릭 시 상세 페이지 이동 + 우측 메뉴(수정/삭제)
- `select`: 카드 클릭 시 선택 토글 + 중앙 선택 오버레이(Plus 아이콘)

### Props

> `CollectionCardProps`는 variant에 따라 props가 달라지는 Discriminated Union 형태입니다.

#### 공통 Props (BaseProps)

| Prop         | Type                         | Default     | Description          |
| ------------ | ---------------------------- | ----------- | -------------------- |
| `collection` | `Collection`                 | -           | 컬렉션 데이터 (필수) |
| `onEdit`     | `(id: CollectionId) => void` | `undefined` | 컬렉션 수정 핸들러   |
| `onDelete`   | `(id: CollectionId) => void` | `undefined` | 컬렉션 삭제 핸들러   |

#### Variant: `default` (DefaultVariantProps)

| Prop          | Type                         | Default     | Description                          |
| ------------- | ---------------------------- | ----------- | ------------------------------------ |
| `variant`     | `"default"`                  | `"default"` | 기본 카드 타입                       |
| `onCardClick` | `(id: CollectionId) => void` | -           | 카드 클릭 시 상세 이동 핸들러 (필수) |

#### Variant: `select` (SelectVariantProps)

| Prop              | Type                         | Default     | Description                  |
| ----------------- | ---------------------------- | ----------- | ---------------------------- |
| `variant`         | `"select"`                   | -           | 선택 카드 타입 (필수)        |
| `selected`        | `boolean`                    | -           | 선택 여부 (필수)             |
| `onCardSelect`    | `(id: CollectionId) => void` | -           | 카드 선택 토글 핸들러 (필수) |
| `disableUnselect` | `boolean`                    | `undefined` | `true`일 때 선택 해제 방지   |

### 사용 예시

#### 1. 기본 사용 (`default`)

> 카드 클릭 시 상세 이동 + 우측 메뉴(수정/삭제)

```tsx
"use client";

import CollectionCard from "@/components/collection/CollectionCard";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";

type CollectionId = Collection["collectionId"];

const CollectionListDefault = () => {
  const collections = collectionMockData;

  const handleCardClick = (id: CollectionId) => {
    // 컬렉션 페이지 이동 로직
    console.log("컬렉션 페이지 이동", id);
  };

  const handleEdit = (id: CollectionId) => {
    // 컬렉션 수정 페이지 이동 로직
    console.log("컬렉션 수정 페이지 이동", id);
  };

  const handleDelete = (id: CollectionId) => {
    // 삭제 다이얼로그 열기 로직
    console.log("삭제 Dialog 열기", id);
  };

  return (
    <div className="flex flex-col gap-2">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.collectionId}
          collection={collection}
          onCardClick={handleCardClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CollectionListDefault;
```

#### 2. 선택 카드 (`select`)

> 카드 클릭 시 선택 토글 + 복수 선택 예시

```tsx
"use client";

import { useState } from "react";
import CollectionCard from "@/components/collection/CollectionCard";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";

type CollectionId = Collection["collectionId"];

const CollectionListSelect = () => {
  const collections = collectionMockData;

  // 선택된 컬렉션 id들을 관리 (복수 선택 예시)
  const [selectedIds, setSelectedIds] = useState<CollectionId[]>([]);

  const handleCardSelect = (id: CollectionId) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.collectionId}
          variant="select"
          collection={collection}
          selected={selectedIds.includes(collection.collectionId)}
          onCardSelect={handleCardSelect}
        />
      ))}
    </div>
  );
};

export default CollectionListSelect;
```

#### 3. 선택 해제 방지 카드 (`disableUnselect`)

> `disableUnselect={true}`면 한 번 선택되면 해제 불가 + 단일 선택 예시

```tsx
"use client";

import { useState } from "react";
import CollectionCard from "@/components/collection/CollectionCard";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Collection } from "@/types/collection";

type CollectionId = Collection["collectionId"];

const CollectionListDisableUnselect = () => {
  const collections = collectionMockData;

  // 단일 선택 예시
  const [selectedId, setSelectedId] = useState<CollectionId | null>(null);

  const handleCardSelect = (id: CollectionId) => {
    // 이미 선택된 카드라면(=해제 시도) 무시하고,
    // 다른 카드를 누르면 선택 변경만 허용
    setSelectedId((prev) => (prev === id ? prev : id));
  };

  return (
    <div className="flex flex-col gap-2">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.collectionId}
          variant="select"
          collection={collection}
          selected={selectedId === collection.collectionId}
          onCardSelect={handleCardSelect}
          disableUnselect
        />
      ))}
    </div>
  );
};

export default CollectionListDisableUnselect;
```
