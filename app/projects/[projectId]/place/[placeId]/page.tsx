"use client";

import Divider from "@/components/common/Divider";
import SourceSection from "@/components/common/SourceSection";
import TeamOpinionSection from "@/components/common/TeamOpinionSection";
import CommentSection from "@/components/common/CommentSection";
import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";
import ProjectBottomTabs, {
  ProjectBottomTabValue,
} from "@/components/projects/ProjectBottomTabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blockMockData } from "@/mocks/blockMockData";
import { commentMockData } from "@/mocks/commentMockData";
import { placeMockData } from "@/mocks/placeMockData";
import useQueryTab from "@/hooks/useTabQueryParam";
import {
  CheckIcon,
  CopyIcon,
  MapPinIcon,
  PencilIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const navItems = [
    {
      icon: <DiamondIcon isActive={false} />,
      label: "컬렉션",
      path: "/home",
    },
    {
      icon: <DiamondIcon isActive={true} />,
      label: "프로젝트",
      path: "/projects",
    },
    {
      icon: <DiamondIcon isActive={false} />,
      label: "마이",
      path: "/my",
    },
  ];

const PlaceDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ projectId?: string; placeId?: string }>();
  const projectId = params.projectId;
  const placeId = params.placeId;

  const { tab } = useQueryTab<ProjectBottomTabValue>({
    defaultValue: "plan",
    allowedValues: ["plan", "budget"],
  });

  const handleTabChange = (value: ProjectBottomTabValue) => {
    if (!projectId) return;
    router.push(`/projects/${projectId}?tab=${value}`);
  };

  const place = useMemo(
    () => placeMockData.find((item) => item.place_id === placeId) ?? null,
    [placeId]
  );

  const initialMemo = useMemo(() => {
    if (!projectId || !placeId) return "";
    const slots = blockMockData[projectId] ?? [];
    const matchedSlot = slots.find((slot) =>
      slot.blocks?.some((block) => block.place_id === placeId)
    );
    return matchedSlot?.memo ?? "";
  }, [projectId, placeId]);

  const { opinions, message, commentGroups } = useMemo(() => {
    const defaultMessage =
      "불가 의견이 반영되었어요.\n다른 장소로 대체해보는 것은 어떨까요?";
    if (!projectId || !placeId) {
      return {
        opinions: [
          { label: "선호해요", value: 0 },
          { label: "가능해요", value: 0 },
          { label: "불가능해요", value: 0 },
        ],
        message: "",
        commentGroups: [],
      };
    }

    const slots = blockMockData[projectId] ?? [];
    const matchedBlock =
      slots
        .flatMap((slot) => slot.blocks ?? [])
        .find((block) => block.place_id === placeId) ?? null;
    const blockId = matchedBlock?.block_id;
    const groups = blockId ? commentMockData[blockId] ?? [] : [];
    const counts = groups.reduce(
      (acc, group) => {
        acc[group.mood] += 1;
        return acc;
      },
      { prefer: 0, available: 0, unavailable: 0 }
    );
    const total = counts.prefer + counts.available + counts.unavailable;
    const toPercent = (value: number) =>
      total === 0 ? 0 : Math.round((value / total) * 100);

    return {
      opinions: [
        { label: "선호해요", value: toPercent(counts.prefer) },
        { label: "가능해요", value: toPercent(counts.available) },
        { label: "불가능해요", value: toPercent(counts.unavailable) },
      ],
      message: counts.unavailable > 0 ? defaultMessage : "",
      commentGroups: groups,
    };
  }, [projectId, placeId]);

  return (
    <PlaceDetailContent
      key={`${projectId}-${placeId}`}
      place={place}
      initialMemo={initialMemo}
      initialOpinions={opinions}
      initialMessage={message}
      initialCommentGroups={commentGroups}
      tab={tab}
      onTabChange={handleTabChange}
    />
  );
};

type PlaceDetailContentProps = {
  place: (typeof placeMockData)[number] | null;
  initialMemo: string;
  initialOpinions: { label: string; value: number }[];
  initialMessage: string;
  initialCommentGroups: typeof commentMockData[string];
  tab: ProjectBottomTabValue;
  onTabChange: (value: ProjectBottomTabValue) => void;
};

const PlaceDetailContent = ({
  place,
  initialMemo,
  tab,
  onTabChange,
  initialCommentGroups,
}: PlaceDetailContentProps) => {
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memo, setMemo] = useState(initialMemo);
  const [commentGroups, setCommentGroups] =
    useState<typeof commentMockData[string]>(initialCommentGroups);

  useEffect(() => {
    setCommentGroups(initialCommentGroups);
  }, [initialCommentGroups]);

  useEffect(() => {
    if (!isEditingMemo) {
      setMemo(initialMemo);
    }
  }, [initialMemo, isEditingMemo]);

  const { opinions, message } = useMemo(() => {
    const defaultMessage =
      "불가 의견이 반영되었어요.\n다른 장소로 대체해보는 것은 어떨까요?";
    const counts = commentGroups.reduce(
      (acc, group) => {
        acc[group.mood] += 1;
        return acc;
      },
      { prefer: 0, available: 0, unavailable: 0 }
    );
    const total = counts.prefer + counts.available + counts.unavailable;
    const toPercent = (value: number) =>
      total === 0 ? 0 : Math.round((value / total) * 100);

    return {
      opinions: [
        { label: "선호해요", value: toPercent(counts.prefer) },
        { label: "가능해요", value: toPercent(counts.available) },
        { label: "불가능해요", value: toPercent(counts.unavailable) },
      ],
      message: counts.unavailable > 0 ? defaultMessage : "",
    };
  }, [commentGroups]);

  const handleCopyPlaceAddress = async () => {
    if (!place?.address || place.address.trim().length === 0) {
      toast("장소 주소가 없습니다.");
      return;
    }
    try {
      await navigator.clipboard.writeText(place.address);
      toast.success("장소 주소가 복사되었습니다");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      toast.error("복사에 실패했습니다");
    }
  };

  const handleEditMemo = () => {
    setIsEditingMemo(true);
  };

  const handleSaveMemo = () => {
    // TODO: 실제 API 호출로 메모 저장
    setIsEditingMemo(false);
    toast.success("메모가 저장되었습니다");
  };

  return (
    <div className="w-full min-h-screen">
      <Header
        variant="center"
        showBackButton
        showNotificationButton
        title={place?.name ?? ""}
        className="fixed top-0 z-10 inset-x-0"
      />
      <main className="flex flex-col gap-6 mt-17 mx-5 pb-40">
        {/* 사진 */}
        <div className="relative w-full h-50 overflow-hidden rounded-[12px] bg-gray-200">
          {place?.photos?.[0] ? (
            <Image
              src={place.photos[0]}
              alt={place.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              이미지가 없습니다
            </div>
          )}
        </div>
        {/* 정보 + 메모 */}
        <div className="flex flex-col gap-8">
          {/* 정보 */}
          <div className="flex flex-col gap-4">
            <Label className="text-lg font-bold">{place?.name}</Label>
            <div className="flex flex-col gap-3.5">
              <Divider />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-gray-500">
                  {place?.category ?? "카테고리 없음"}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center min-w-0 flex-1">
                    <MapPinIcon className="size-6 shrink-0" />
                    <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {place?.address}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={handleCopyPlaceAddress}>
                    <CopyIcon className="size-6" />
                  </Button>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <TimerIcon className="size-6" />
                  <p className="text-sm">영업 정보 없음</p>
                </div>
              </div>
              <Divider />
            </div>
          </div>
          {/* 메모 */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <Label className="font-bold">메모</Label>
              {isEditingMemo ? (
                <Button variant="ghost" onClick={handleSaveMemo}>
                  <CheckIcon className="size-6" />
                </Button>
              ) : (
                <Button variant="ghost" onClick={handleEditMemo}>
                  <PencilIcon className="size-6" />
                </Button>
              )}
            </div>
            {isEditingMemo ? (
              <Textarea
                placeholder="메모를 입력하세요"
                className="resize-none h-20 text-sm"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            ) : (
              <p className="text-sm min-h-[80px] whitespace-pre-wrap">
                {memo || "메모가 없습니다"}
              </p>
            )}
          </div>
        </div>
        {/* 맵 및 출처*/}
        <div className="flex flex-col gap-5">
          {/* 구글 맵이 들어갈 자리 */}
          <div className="w-full h-57 bg-gray-300 rounded-[12px]" />
          {/* 출처 */}
          <SourceSection source={place?.google_maps_uri} />
          <TeamOpinionSection
            opinions={opinions}
            message={message}
          />
          <div className="flex flex-col gap-5">
            <Label className="font-bold">코멘트</Label>
            {commentGroups.length > 0 ? (
              <CommentSection
                groups={commentGroups}
                onChange={setCommentGroups}
              />
            ) : (
              <p className="text-sm text-slate-400">코멘트가 없습니다</p>
            )}
          </div>
        </div>
      </main>
      <ProjectBottomTabs value={tab} onValueChange={onTabChange} />
      <NavigationBar items={navItems} className="fixed bottom-0 inset-x-0" />
    </div>
  );
};

export default PlaceDetailPage;
