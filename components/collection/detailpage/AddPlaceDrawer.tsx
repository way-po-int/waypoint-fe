"use client";

import Divider from "@/components/common/Divider";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { CircleQuestionMarkIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const AddPlaceDrawer = () => {
  const params = useParams();
  const collectionId = params.id as string;
  return (
    <DrawerContent className="p-2">
      <DrawerHeader>
        <div className="flex justify-between items-center">
          <DrawerTitle className="text-base font-bold">
            AI로 컨텐츠 장소 찾아오기
          </DrawerTitle>
          <DrawerDescription aria-hidden="true" className="hidden">
            장소 추가
          </DrawerDescription>
          <Button variant="ghost" className="w-6 h-6">
            <CircleQuestionMarkIcon className="size-6" />
          </Button>
        </div>
      </DrawerHeader>
      <div className="p-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#020618]">URL을 입력하세요</p>
            <Input placeholder="Input Value" />
          </div>
          <Button className="px-8 py-5">저장하기</Button>
          <Divider className="my-3" />
          <Link
            href={`/collection/${collectionId}/add-place`}
            className="w-full"
          >
            <Button className="px-8 py-5 w-full">장소 검색해서 추가하기</Button>
          </Link>
        </div>
      </div>
    </DrawerContent>
  );
};

export default AddPlaceDrawer;
