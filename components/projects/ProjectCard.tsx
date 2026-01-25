import { Plan } from "@/types/plan";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({ plan }: { plan: Plan }) => {
  return (
    <Link
      href={`/projects/${plan.plan_id}`}
      className="w-full rounded-2xl bg-slate-200 p-2 h-57"
    >
      {/* 썸네일 TODO: 썸네일 관련 회의 필요, API에 없음*/}
      <div className="flex flex-col gap-4">
        <div className="bg-white w-full h-37" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-base font-bold">{plan.title}</p>
            <p className="text-base font-normal">{plan.member_count}명</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Open menu"
                size="icon-sm"
                className="ml-1"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Pencil className="text-black" />
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="text-black" />
                  삭제
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
