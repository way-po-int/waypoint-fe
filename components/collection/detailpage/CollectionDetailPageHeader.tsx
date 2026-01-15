"use client";

import { useState } from "react";
import { ChevronDownIcon, MenuIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CollectionDetailPageHeader = () => {
  const [sortBy, setSortBy] = useState<"latest" | "name">("latest");

  return (
    <div className="fixed py-2.5 px-5 flex justify-between items-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-32 h-10 justify-between border border-gray-200 bg-white text-black hover:bg-gray-50"
          >
            {sortBy === "latest" ? "최신 순" : "이름 순"}
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          <DropdownMenuItem onClick={() => setSortBy("latest")}>
            최신 순
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("name")}>
            이름 순
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="w-6 h-6">
          <SearchIcon />
        </Button>
        <Button variant="ghost" className="w-6 h-6">
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
};

export default CollectionDetailPageHeader;
