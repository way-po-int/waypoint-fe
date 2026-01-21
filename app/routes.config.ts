/**
 * Development Page Routes Configuration
 * 
 * 이 파일은 개발용 페이지에서 사용할 라우트 목록을 관리합니다.
 * 새로운 페이지를 개발하신 경우 아래 가이드를 참고하여 라우트를 추가해주세요.
 */

// ============================================================================
// 타입 정의
// ============================================================================

export interface RouteInfo {
  path: string;                                    // 라우트 경로 (예: "/home", "/login")
  label: string;                                   // 화면에 표시될 라벨
  description?: string;                            // 라우트에 대한 간단한 설명 (선택사항)
  params?: { name: string; placeholder: string }[]; // 동적 파라미터 정보 (선택사항)
}

// ============================================================================
// 라우트 목록
// ============================================================================

/**
 * getRoutes - 동적 파라미터를 포함한 라우트 목록을 반환합니다
 * 
 * @param dynamicParams - 동적 라우트에 사용될 파라미터 객체
 * @returns RouteInfo 배열
 * 
 * @example
 * // 기본 사용법
 * const routes = getRoutes({ collectionId: "1", id: "1" });
 */
export const getRoutes = (dynamicParams: Record<string, string>): RouteInfo[] => [
  // ========================================
  // 인증 관련 페이지
  // ========================================
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

  // ========================================
  // 홈 & 컬렉션 페이지
  // ========================================
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
    path: `/collection/${dynamicParams.collectionId}`,
    label: "Collection Detail",
    description: "컬렉션 상세 페이지",
    params: [{ name: "collectionId", placeholder: "Collection ID" }],
  },

  // ========================================
  // 기타 페이지
  // ========================================
  {
    path: `/project`,
    label: "Project Page",
    description: "프로젝트 페이지",
  },
  {
    path: `/my`,
    label: "My Page",
    description: "마이 페이지",
  },

  // ========================================
  // 👇 여기에 새로운 라우트를 추가하세요
  // ========================================
  
  /**
   * 새 라우트 추가 예시:
   * 
   * 1. 정적 라우트 (파라미터 없음):
   * {
   *   path: "/your-page",
   *   label: "Your Page",
   *   description: "페이지 설명",
   * },
   * 
   * 2. 동적 라우트 (파라미터 있음):
   * {
   *   path: `/your-page/${dynamicParams.yourParamName}`,
   *   label: "Your Dynamic Page",
   *   description: "동적 페이지 설명",
   *   params: [{ name: "yourParamName", placeholder: "파라미터 설명" }],
   * },
   * 
   * 주의사항:
   * - 동적 라우트를 추가할 경우, page.tsx의 dynamicParams 초기값도 함께 추가해주세요
   * - path는 실제 Next.js 라우트 경로와 일치해야 합니다
   * - 마지막 항목에는 쉼표(,)를 빼주세요
   */
];

// ============================================================================
// 동적 파라미터 기본값
// ============================================================================

/**
 * 동적 라우트에 사용될 파라미터의 기본값
 * 새로운 동적 라우트를 추가할 경우 여기에 기본값도 함께 추가해주세요
 */
export const defaultDynamicParams: Record<string, string> = {
  collectionId: "1",
  id: "1",
  // 여기에 새로운 동적 파라미터의 기본값을 추가하세요
  // yourParamName: "defaultValue",
};
