"use client";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      {/* 로고 영역 */}
      <div className="flex flex-1 items-center">
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tight">
            LOGO
          </h1>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full space-y-3">
        {/* 회원가입 버튼 */}
        <button 
          onClick={() => router.push("/signup")}
          className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50"
        >
          회원가입
        </button>

        {/* 카카오 로그인 버튼 */}
        <button className="h-14 w-full rounded-xl bg-[#1a1a1a] text-base font-semibold text-white transition-colors hover:bg-black">
          카카오 로그인
        </button>

        {/* 네이버 로그인 버튼 */}
        <button className="h-14 w-full rounded-xl bg-[#1a1a1a] text-base font-semibold text-white transition-colors hover:bg-black">
          네이버 로그인
        </button>

        {/* 구글 로그인 버튼 */}
        <button className="h-14 w-full rounded-xl bg-[#1a1a1a] text-base font-semibold text-white transition-colors hover:bg-black">
          구글 로그인
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
