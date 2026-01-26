"use client";

import { ChevronDownIcon, MenuIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import MemberManageSidebar from "../../common/MemberManageSidebar";

interface CollectionDetailPageHeaderProps {
  sortBy: "latest" | "oldest" | string;
  setSortBy: (sortBy: "latest" | "oldest" | string) => void;
  members: string[];
}

const CollectionDetailPageHeader = ({
  sortBy,
  setSortBy,
  members,
}: CollectionDetailPageHeaderProps) => {
  const getSortLabel = () => {
    if (sortBy === "latest") return "최신 순";
    if (sortBy === "oldest") return "오래된 순";
    return `${sortBy}의 장소`;
  };

  return (
    <div className="fixed top-14 py-2.5 px-5 flex justify-between items-center w-full bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-40 h-10 justify-between border border-gray-200 bg-white text-black hover:bg-gray-50"
          >
            {getSortLabel()}
            <ChevronDownIcon className="text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          <DropdownMenuItem onClick={() => setSortBy("latest")}>
            최신 순
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("oldest")}>
            오래된 순
          </DropdownMenuItem>
          {members.map((member) => (
            <DropdownMenuItem key={member} onClick={() => setSortBy(member)}>
              {member}의 장소
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <SearchIcon className="size-6" />
        </Button>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              onClick={(e) => {
                // Drawer가 열릴 때 포커스를 제거하여 aria-hidden 충돌 방지
                e.currentTarget.blur();
              }}
            >
              <MenuIcon className="size-6" />
            </Button>
          </DrawerTrigger>
          <MemberManageSidebar variant="collection" members={members} />
        </Drawer>
      </div>
    </div>
  );
};

export default CollectionDetailPageHeader;
