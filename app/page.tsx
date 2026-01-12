"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SPLASH_DURATION = 300; // 300ms

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 300ms 후 로그인 페이지로 이동
    const timer = setTimeout(() => {
      router.push("/login");
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* 로고 영역 */}
      <div className="flex flex-1 items-center">
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tight">
            LOGO
          </h1>
        </div>
      </div>

      {/* 저작권 표시 */}
      <div className="pb-16">
        <p className="text-center text-sm text-gray-900">
          © All rights are reserved by Waypoint
        </p>
      </div>
    </main>
  );
};

export default LandingPage;
