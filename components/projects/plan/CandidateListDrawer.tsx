import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

interface CandidateListDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: string[];
}

const CandidateListDrawer = ({
  open,
  onOpenChange,
  candidates,
}: CandidateListDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        showHandle={false}
        className="w-full bg-[#FFFFFF] p-5 shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.1)]"
        style={{ height: "152px" }}
      >
        <div className="flex flex-col gap-[10px]">
          <DrawerTitle className="h-[20px] w-[77px] text-sm font-bold leading-4 text-[#374151]">
            후보지 리스트
          </DrawerTitle>
          <div className="flex flex-col gap-[10px]">
            {candidates.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="h-[36px] w-[144px] rounded-[4px] px-2 py-[6px] text-base font-medium text-slate-900"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CandidateListDrawer;
