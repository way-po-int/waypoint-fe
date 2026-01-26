"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import TravelMembersSection from "../collection/detailpage/TravelMembersSection";
import TravelPlanStartSection from "../collection/detailpage/TravelPlanStartSection";
import LeaveDialog from "./LeaveDialog";

interface MemberManageSidebarProps {
  variant: "project" | "collection";
  members: string[];
}

const MemberManageSidebar = ({
  variant,
  members,
}: MemberManageSidebarProps) => {
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
      {variant === "collection" && <TravelPlanStartSection />}
      {variant === "project" && (
        <Button className="mt-8 mx-2">컬렉션 관리</Button>
      )}
      <LeaveDialog variant={variant} />
    </DrawerContent>
  );
};

export default MemberManageSidebar;
