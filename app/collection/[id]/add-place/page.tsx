"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import SearchPlaceItem from "@/components/collection/detailpage/SearchPlaceItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SearchPlace {
  name: string;
  address: string;
  description: string;
}

const mockPlaces: SearchPlace[] = [
  {
    name: "헤이리 예술 마을",
    address: "서울시 마포구 와우산로",
    description: "유럽풍의 정원, 베이커리, 카페, 레스토랑...",
  },
  {
    name: "서학동 예술마을",
    address: "전주시 완산구 서학동",
    description: "전주시의 버스 정류장",
  },
  {
    name: "경복궁",
    address: "서울특별시 종로구 사직로",
    description: "조선 왕조 제1의 법궁으로 태조 4년에 건립된 궁궐",
  },
  {
    name: "남산타워",
    address: "서울특별시 용산구 남산공원길",
    description:
      "서울의 랜드마크인 남산타워에서 서울 전경을 감상할 수 있습니다",
  },
  {
    name: "한강공원",
    address: "서울특별시 영등포구 여의도로",
    description:
      "한강을 따라 조성된 공원으로 다양한 레저 활동을 즐길 수 있습니다",
  },
];

const AddPlacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const collectionId = params.id as string;
  const filteredPlaces = mockPlaces.filter((place) =>
    place.name.includes(searchQuery),
  );

  return (
    <div>
      <Header variant="left" title="장소 검색" showCloseButton />
      <div className="px-5">
        <InputGroup className="mt-7 border-0 border-b border-b-[1px] shadow-none rounded-none">
          <InputGroupInput
            placeholder="가고 싶은 장소를 검색하세요"
            className="placeholder:text-sm placeholder:font-normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      {searchQuery && filteredPlaces.length > 0 && (
        <div className="px-5 mt-4 space-y-4">
          {filteredPlaces.map((place, index) => (
            <SearchPlaceItem
              key={index}
              name={place.name}
              address={place.address}
              description={place.description}
              onAdd={() => {
                // TODO: 장소 추가 로직 구현
                console.log("장소 추가:", place.name);
              }}
            />
          ))}
          <Link href={`/collection/${collectionId}/add-place/manual`}>
            <Button
              variant="ghost"
              className="text-xs text-slate-500 w-full justify-center p-0 h-auto mt-10"
            >
              장소를 찾지 못하시겠나요?
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddPlacePage;
