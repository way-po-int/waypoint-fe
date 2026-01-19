"use client";

import Link from "next/link";
import { useState } from "react";

interface RouteInfo {
  path: string;
  label: string;
  description?: string;
  params?: { name: string; placeholder: string }[];
}

const DevPage = () => {
  const [dynamicParams, setDynamicParams] = useState<Record<string, string>>({
    collectionId: "1",
    id: "1",
  });

  const routes: RouteInfo[] = [
    {
      path: "/landing",
      label: "Landing Page",
      description: "스플래시 화면",
    },
    {
      path: "/login",
      label: "Login Page",
      description: "로그인 페이지",
    },
    {
      path: "/signup",
      label: "Signup Page",
      description: "회원가입 페이지",
    },
    {
      path: "/home",
      label: "Home Page",
      description: "홈 페이지",
    },
    {
      path: "/home/create",
      label: "Create Collection",
      description: "컬렉션 생성 페이지",
    },
    {
      path: `/home/${dynamicParams.collectionId}/edit`,
      label: "Edit Collection",
      description: "컬렉션 편집 페이지",
      params: [{ name: "collectionId", placeholder: "Collection ID" }],
    },
    {
      path: `/collection/${dynamicParams.id}`,
      label: "Collection Detail",
      description: "컬렉션 상세 페이지",
      params: [{ name: "id", placeholder: "Collection ID" }],
    },
    {
      path: `/project`,
      label: "Project Page",
      description: "프로젝트 페이지",
    },
    {
      path: `/my`,
      label: "My Page",
      description: "마이 페이지",
    }
  ];

  const handleParamChange = (paramName: string, value: string) => {
    setDynamicParams((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            Development Page
          </h1>
          <p className="mt-2 text-gray-600">
            개발용 페이지 - 모든 라우트로 빠르게 이동할 수 있습니다
          </p>
        </div>

        {/* Dynamic Parameters Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            동적 라우트 파라미터
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Collection ID
              </label>
              <input
                type="text"
                value={dynamicParams.collectionId}
                onChange={(e) =>
                  handleParamChange("collectionId", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="예: 1"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Detail Page ID
              </label>
              <input
                type="text"
                value={dynamicParams.id}
                onChange={(e) => handleParamChange("id", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="예: 1"
              />
            </div>
          </div>
        </div>

        {/* Routes Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-900">페이지 목록</h2>
          <div className="space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="block rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-blue-600">
                        {route.path}
                      </span>
                      {route.params && (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                          동적
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {route.label}
                    </div>
                    {route.description && (
                      <div className="mt-1 text-xs text-gray-500">
                        {route.description}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>동적 라우트는 위에서 파라미터 값을 변경할 수 있습니다</li>
            <li>각 카드를 클릭하면 해당 페이지로 이동합니다</li>
            <li>
              추후 작업에 따라 페이지 목록을 추가해주세요.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DevPage;
