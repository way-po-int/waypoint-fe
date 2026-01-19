import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchPlaceItemProps {
  name: string;
  address: string;
  description: string;
  onAdd?: () => void;
}

const SearchPlaceItem = ({
  name,
  address,
  description,
  onAdd,
}: SearchPlaceItemProps) => {
  return (
    <div className="bg-slate-200 rounded-2xl p-2 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0 gap-4">
        <h3 className="text-base font-bold">{name}</h3>
        <p className="text-sm font-semibold">{address}</p>
        <p className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="bg-slate-200 rounded-md flex-shrink-0 size-10"
        onClick={onAdd}
      >
        <Plus className="size-4 text-gray-900" strokeWidth={3} />
      </Button>
    </div>
  );
};

export default SearchPlaceItem;
