"use client";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CollectionCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  // 입력값이 비어있거나 공백만 있는지 확인
  const isDisabled = title.trim().length === 0;

  // 완료하기 버튼 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    // TODO: 추후 Collection(POST) API 연동
    console.log("컬렉션명:", title);

    router.push("/home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더: 뒤로가기 버튼 + 알림 버튼 */}
      <Header
        variant="left"
        showBackButton
        showNotificationButton
        showBackground={false}
      />

      {/* 컬렉션 생성 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        {/* 메인 컨텐츠 */}
        <main className="flex flex-1 flex-col p-4 items-start mt-20 gap-14">
          {/* 타이틀 */}
          <h2 className="text-start text-2xl font-semibold text-black">
            여행 시작을 위한 <br />
            장소 컬렉션을 만들어보세요
          </h2>

          {/* 컬렉션명 입력 필드 */}
          <section className="w-full grid gap-1 items-center">
            <Label htmlFor="title" className="text-sm font-medium">
              컬렉션명을 입력하세요
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Input Value"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>
        </main>

        {/* 하단 버튼 */}
        <footer className="mb-24 px-4">
          <Button type="submit" className="w-full" disabled={isDisabled}>
            완료하기
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default CollectionCreatePage;
