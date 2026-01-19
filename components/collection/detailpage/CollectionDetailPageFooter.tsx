"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import AddPlaceDrawer from "./AddPlaceDrawer";

const CollectionDetailPageFooter = () => {
  return (
    <div className="fixed inset-x-0 bottom-20 w-full p-5 shadow-[0_-4px_16px_0_rgba(0,0,0,0.1)] bg-white">
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <Button className="w-full">장소 추가하기</Button>
        </DrawerTrigger>
        <AddPlaceDrawer />
      </Drawer>
    </div>
  );
};

export default CollectionDetailPageFooter;
