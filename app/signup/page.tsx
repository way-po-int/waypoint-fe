"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    location: false,
    privacy: false,
    marketing: false,
  });

  // 전체 동의 체크박스 핸들러
  const handleAllCheck = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      location: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  // 개별 체크박스 핸들러
  const handleIndividualCheck = (key: keyof typeof agreements) => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };
    
    // 모든 개별 항목이 체크되면 전체 동의도 체크
    newAgreements.all = 
      newAgreements.location && 
      newAgreements.privacy && 
      newAgreements.marketing;
    
    setAgreements(newAgreements);
  };

  // 필수 항목이 모두 체크되었는지 확인
  const isRequiredChecked = agreements.location && agreements.privacy;

  // 계속하기 버튼 핸들러
  const handleContinue = () => {
    if (isRequiredChecked) {
      // TODO: 다음 회원가입 단계로 이동
      console.log("회원가입 계속하기", agreements);
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-4">
      {/* 헤더 */}
      <header className="mb-12">
        <button 
          onClick={() => router.back()}
          className="flex h-12 w-12 items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </header>

      {/* 타이틀 */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold leading-tight">
          회원 가입을 위해<br />
          아래 약관에 동의해주세요
        </h1>
      </div>

      {/* 약관 동의 체크박스 */}
      <div className="flex-1">
        <div className="space-y-6">
          {/* 전체 동의 */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={handleAllCheck}
              className="h-6 w-6 rounded border-2 border-gray-300 accent-black"
            />
            <span className="text-base font-medium">약관 전체 동의</span>
          </label>

          <div className="h-px bg-gray-200" />

          {/* 위치기반 정보 수집 동의 */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={agreements.location}
              onChange={() => handleIndividualCheck("location")}
              className="h-6 w-6 rounded border-2 border-gray-300 accent-black"
            />
            <span className="text-base">
              <span className="text-gray-600">[필수]</span> 위치기반 정보 수집 동의
            </span>
          </label>

          {/* 개인정보 수집/이용 동의 */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleIndividualCheck("privacy")}
              className="h-6 w-6 rounded border-2 border-gray-300 accent-black"
            />
            <span className="text-base">
              <span className="text-gray-600">[필수]</span> 개인정보 수집/이용 동의
            </span>
          </label>

          {/* 마케팅 정보 수신 동의 */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={() => handleIndividualCheck("marketing")}
              className="h-6 w-6 rounded border-2 border-gray-300 accent-black"
            />
            <span className="text-base">
              <span className="text-gray-600">[선택]</span> 마케팅 정보 수신 동의
            </span>
          </label>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="pb-8 pt-6">
        <button
          onClick={handleContinue}
          disabled={!isRequiredChecked}
          className={`h-14 w-full rounded-xl text-base font-semibold transition-colors ${
            isRequiredChecked
              ? "bg-[#1a1a1a] text-white hover:bg-black"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          동의하고 계속하기
        </button>
      </div>
    </main>
  );
};

export default SignupPage;
