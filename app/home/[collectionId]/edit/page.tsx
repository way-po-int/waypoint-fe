"use client";

import Header from "@/components/layout/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collectionMockData } from "@/mocks/collectionMockData";
import { Check, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CollectionEditPage = () => {
  const router = useRouter();
  const params = useParams<{ collectionId: string }>();
  const collectionId = params.collectionId;

  const targetCollection = collectionMockData.find(
    (c) => c.collection_id === collectionId
  );

  // TODO: 추후 Collection(GET) API 연동
  const initialTitle = targetCollection?.title ?? "";
  const [originalTitle] = useState(initialTitle);

  // 텍스트 모드에서 보여줄 값 (편집 종료 후 반영되는 값)
  const [displayTitle, setDisplayTitle] = useState(initialTitle);
  // 편집 모드에서 편집 중인 값
  const [draftTitle, setDraftTitle] = useState(initialTitle);

  // 편집 모드 여부
  const [isEditing, setIsEditing] = useState(false);
  // 저장 확인 Dialog 열림 여부
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const trimmedDraft = draftTitle.trim();
  const trimmedDisplay = displayTitle.trim();
  const trimmedOriginal = originalTitle.trim();

  // 체크 버튼(편집 종료) 비활성화 조건: 빈값/공백
  const isCheckDisabled = trimmedDraft.length === 0;

  // 수정완료 버튼 비활성화 조건: 편집 모드/기존 값과 같을 시
  const isDoneDisabled = isEditing || trimmedDisplay === trimmedOriginal;

  // 편집 모드 진입 시 인풋 포커스 + 커서 맨 뒤
  useEffect(() => {
    if (!isEditing) return;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len);
    });
  }, [isEditing]);

  // 연필 클릭 → 편집 시작
  const handleStartEdit = () => {
    setDraftTitle(displayTitle);
    setIsEditing(true);
  };

  // 체크 클릭 → 편집 종료
  const handleFinishEdit = () => {
    if (isCheckDisabled) return;

    const next = trimmedDraft;

    setDisplayTitle(next);
    setIsEditing(false);
  };

  // 수정완료 클릭 → AlertDialog 오픈
  const handleDone = () => {
    if (isDoneDisabled) return;

    setIsDialogOpen(true);
  };

  // 저장하기 클릭 → 홈 이동
  const handleSave = () => {
    // TODO: 추후 Collection(PUT) API 연동
    console.log("컬렉션 수정:", {
      collectionId,
      title: trimmedDisplay,
    });

    setIsDialogOpen(false);
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더: 타이틀 + 닫기 버튼 */}
      <Header variant="left" title="컬렉션 수정" showCloseButton />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col p-4 items-start mt-6 gap-1">
        <Label className="text-base font-bold text-black">컬렉션 이름</Label>

        <div className="flex items-center w-full gap-3">
          {/* 텍스트 ↔ 인풋 전환 */}
          <div className="flex-1">
            {isEditing ? (
              <Input
                ref={inputRef}
                id="title"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
            ) : (
              <span className="text-sm text-black">{displayTitle}</span>
            )}
          </div>

          {/* 우측 버튼: 편집 시작(연필) ↔ 편집 종료(체크) */}
          <Button
            type="button"
            size="icon-lg"
            onClick={isEditing ? handleFinishEdit : handleStartEdit}
            disabled={isEditing && isCheckDisabled}
            aria-label={isEditing ? "편집 종료" : "편집 시작"}
          >
            {isEditing ? (
              <Check className="size-6" />
            ) : (
              <Pencil className="size-6" />
            )}
          </Button>
        </div>
      </main>

      {/* 하단 수정완료 버튼 */}
      <footer className="mb-24 px-4">
        <Button
          type="button"
          className="w-full"
          disabled={isDoneDisabled}
          onClick={handleDone}
        >
          수정완료
        </Button>
      </footer>

      {/* 저장 확인 Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="sm:max-w-[343px] w-[calc(100%-2rem)] max-w-[343px]">
          <AlertDialogHeader className="text-left">
            <AlertDialogTitle>
              수정 사항을 <br />
              저장하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription />
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-end">
            <AlertDialogCancel>취소하기</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>저장하기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CollectionEditPage;
