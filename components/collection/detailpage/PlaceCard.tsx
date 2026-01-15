import { Button } from "@/components/ui/button";
import { Place } from "@/types/collection";
import {
  BanIcon,
  EllipsisIcon,
  FlagTriangleRight,
  MapPinIcon,
} from "lucide-react";

const PlaceCard = ({ place }: { place: Place }) => {
  return (
    <div className="flex flex-col gap-2.5 bg-slate-200 p-2.5 rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-base font-bold">{place.placeName}</p>
        <Button variant="ghost" className="w-6 h-6">
          <EllipsisIcon />
        </Button>
      </div>
      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        {place.placeDescription}
      </p>
      <div className="h-22 bg-white flex items-center justify-center">
        사진이 들어갈 공간입니다.
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex gap-[7px] items-center">
          <MapPinIcon className="w-4.5 h-4.5" />
          <p className="text-sm">{place.placeAddress}</p>
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            className="bg-slate-100 rounded-2 px-[3px] py-[2px] gap-2.5"
          >
            <FlagTriangleRight size={20} />
            <p className="text-sm">{place.likeCount}</p>
          </Button>
          <Button
            variant="ghost"
            className="bg-slate-100 rounded-2 px-[3px] py-[2px] gap-2.5"
          >
            <BanIcon size={20} />
            <p className="text-sm">{place.dislikeCount}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
