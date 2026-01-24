"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import TravelMembersSection from "./TravelMembersSection";
import TravelPlanStartSection from "./TravelPlanStartSection";
import LeaveCollectionDialog from "./LeaveCollectionDialog";

interface CollectionDetailSidebarProps {
  members: string[];
}

const CollectionDetailSidebar = ({ members }: CollectionDetailSidebarProps) => {
  console.log(members);

  return (
    <DrawerContent>
      <DrawerHeader className="flex items-end w-full p-3">
        <DrawerClose asChild>
          <Button variant="ghost" className="w-6 h-6">
            <X className="size-6" />
          </Button>
        </DrawerClose>
        <DrawerDescription className="sr-only">
          여행 멤버 관리 사이드바
        </DrawerDescription>
      </DrawerHeader>
      <TravelMembersSection members={members} />
      <TravelPlanStartSection />
      <LeaveCollectionDialog />
    </DrawerContent>
  );
};

export default CollectionDetailSidebar;
