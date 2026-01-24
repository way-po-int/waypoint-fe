import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardContent } from "../ui/card";
import { Collection } from "@/types/collection";
import { Button } from "../ui/button";
import { Dot, MoreHorizontalIcon, Pencil, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type CollectionId = Collection["collection_id"];

interface BaseProps {
  collection: Collection;
  // 컬렉션 수정
  onEdit?: (id: CollectionId) => void;
  // 컬렉션 삭제
  onDelete?: (id: CollectionId) => void;
}

// 기본 카드 variant (상세 이동용)
interface DefaultVariantProps extends BaseProps {
  variant?: "default";
  // 컬렉션 상세 페이지 이동
  onCardClick: (id: CollectionId) => void;
}

// 선택 카드 variant (선택/토글용)
interface SelectVariantProps extends BaseProps {
  variant: "select";
  selected: boolean;
  // 컬렉션 선택 토글
  onCardSelect: (id: CollectionId) => void;
  // 선택 해제 방지
  disableUnselect?: boolean;
}

type CollectionCardProps = DefaultVariantProps | SelectVariantProps;

const CollectionCard = (props: CollectionCardProps) => {
  const { collection } = props;
  const { collection_id, title, member_count } = collection;

  // select variant 여부
  const isSelect = props.variant === "select";
  // 선택 상태
  const isSelected = isSelect ? props.selected : false;

  // 컬렉션 카드 핸들러 (이동 or 선택)
  const handleCard = () => {
    if (isSelect) {
      if (props.disableUnselect && props.selected) return;
      props.onCardSelect(collection_id);
    } else {
      props.onCardClick(collection_id);
    }
  };

  // 메뉴 클릭 시 카드 클릭 이벤트 방지
  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 컬렉션 수정 핸들러
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onEdit?.(collection_id);
  };

  // 컬렉션 삭제 핸들러
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onDelete?.(collection_id);
  };

  return (
    <Card
      role="button"
      aria-pressed={isSelect ? isSelected : undefined}
      onClick={handleCard}
      className="w-full rounded-2xl bg-gray-200 p-2 mt-4 cursor-pointer"
    >
      <CardContent className="px-0">
        <AspectRatio ratio={2 / 1} className="relative">
          {/* 컬렉션 썸네일 */}
          <Image
            src={"https://placehold.co/600x300/FFFFFF/FFFFFF.png"}
            alt={title}
            fill
            className="rounded-xl bg-white object-cover"
          />

          {/* select variant */}
          {isSelect && (
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-200 transition ${
                isSelected && "bg-gray-700"
              }`}
            >
              <Plus className="text-white" />
            </div>
          )}
        </AspectRatio>

        {/* 카드 하단 정보 영역 */}
        <div className="flex items-start justify-between mt-4">
          <div className="min-w-0">
            {/* 제목 + 여행지 */}
            <div className="flex items-center">
              <span className="truncate text-base font-semibold text-gray-900">
                {title}
              </span>
              <Dot className="w-4 h-4" />
            </div>

            {/* 인원수 */}
            <p className="text-base text-gray-700">{member_count}명</p>
          </div>

          {/* 수정/삭제 메뉴 버튼 (default variant) */}
          {!isSelect && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Open menu"
                  size="icon-sm"
                  onClick={handleMenu}
                  className="ml-1"
                >
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="text-black" />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash2 className="text-black" />
                    삭제
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
