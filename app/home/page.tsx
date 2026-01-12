"use client";

import Header from "@/components/layout/Header";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더: LOGO + 알림 버튼 */}
      <Header variant="logo" showNotificationButton />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">홈 페이지</h2>
          <p className="mt-2 text-sm text-gray-600">
            Header가 적용되었습니다
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
