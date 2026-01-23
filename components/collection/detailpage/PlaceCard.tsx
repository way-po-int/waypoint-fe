import { Button } from "@/components/ui/button";
import { CollectionPlace } from "@/types/collection";
import {
  BanIcon,
  EllipsisIcon,
  FlagTriangleRight,
  MapPinIcon,
} from "lucide-react";

const PlaceCard = ({
  collectionPlace,
}: {
  collectionPlace: CollectionPlace;
}) => {
  const { place, memo, like_count, dislike_count } = collectionPlace;
  return (
    <div className="flex flex-col gap-2.5 bg-slate-200 p-2.5 rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-base font-bold">{place.name}</p>
        <Button variant="ghost">
          <EllipsisIcon className="size-6" />
        </Button>
      </div>
      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        {memo}
      </p>
      <div className="h-22 bg-white flex items-center justify-center">
        사진이 들어갈 공간입니다.
      </div>
      <div className="flex flex-row w-full justify-between items-center gap-2">
        <div className="flex gap-[7px] items-center min-w-0 flex-1">
          <MapPinIcon className="size-4.5 flex-shrink-0" />
          <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {place.address}
          </p>
        </div>
        <div className="flex gap-2.5 flex-shrink-0">
          <Button
            variant="ghost"
            className="bg-slate-100 rounded-2 px-[3px] py-[2px] gap-2.5"
          >
            <FlagTriangleRight className="size-5" />
            <p className="text-sm">{like_count}</p>
          </Button>
          <Button
            variant="ghost"
            className="bg-slate-100 rounded-2 px-[3px] py-[2px] gap-2.5"
          >
            <BanIcon className="size-5" />
            <p className="text-sm">{dislike_count}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
