# Layout Components

재사용 가능한 레이아웃 컴포넌트 모음입니다.

## Header

다양한 형태의 헤더를 지원하는 컴포넌트입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"left" \| "center" \| "logo"` | `"left"` | 헤더 레이아웃 타입 |
| `title` | `string` | `""` | 헤더 타이틀 텍스트 |
| `showBackButton` | `boolean` | `false` | 뒤로가기 버튼 표시 여부 |
| `showCloseButton` | `boolean` | `false` | 닫기(X) 버튼 표시 여부 |
| `showNotificationButton` | `boolean` | `false` | 알림 버튼 표시 여부 |
| `onBack` | `() => void` | `undefined` | 뒤로가기 버튼 클릭 핸들러 |
| `onClose` | `() => void` | `undefined` | 닫기 버튼 클릭 핸들러 |
| `onNotification` | `() => void` | `undefined` | 알림 버튼 클릭 핸들러 |
| `className` | `string` | `""` | 추가 CSS 클래스 |

### 사용 예시

#### 1. 좌측 타이틀 + 우측 닫기 버튼

```tsx
<Header 
  variant="left" 
  title="수동 입력" 
  showCloseButton 
/>
```

#### 2. 좌측 타이틀 + 우측 닫기 버튼 (다른 타이틀)

```tsx
<Header 
  variant="left" 
  title="장소 검색" 
  showCloseButton 
/>
```

#### 3. 중앙 타이틀 + 좌측 뒤로가기 + 우측 알림

```tsx
<Header 
  variant="center" 
  title="제주도 여행 리스트"
  showBackButton
  showNotificationButton
/>
```

#### 4. LOGO + 우측 알림

```tsx
<Header 
  variant="logo" 
  showNotificationButton 
/>
```

#### 5. 커스텀 핸들러

```tsx
<Header 
  variant="left" 
  title="컬렉션 수정"
  showCloseButton
  onClose={() => {
    // 커스텀 닫기 로직
    console.log("커스텀 닫기");
  }}
/>
```

## NavigationBar

하단 네비게이션 바 컴포넌트입니다. 각 페이지에서 필요한 네비게이션 아이템을 전달하여 사용할 수 있습니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItem[]` | - | 네비게이션 아이템 배열 (필수) |
| `className` | `string` | `""` | 추가 CSS 클래스 |

### NavItem 인터페이스

```typescript
interface NavItem {
  icon: React.ReactNode;  // 아이콘 컴포넌트
  label: string;          // 라벨 텍스트
  path: string;           // 이동할 경로
}
```

### DiamondIcon

기본 제공되는 다이아몬드 모양의 아이콘 컴포넌트입니다.

```typescript
<DiamondIcon isActive={boolean} />
```

### 사용 예시

#### 1. 기본 사용 (DiamondIcon 사용)

```tsx
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";

const navItems = [
  {
    icon: <DiamondIcon isActive={true} />,
    label: "컬렉션",
    path: "/home",
  },
  {
    icon: <DiamondIcon isActive={false} />,
    label: "프로젝트",
    path: "/projects",
  },
  {
    icon: <DiamondIcon isActive={false} />,
    label: "마이",
    path: "/my",
  },
];

<NavigationBar items={navItems} />
```

#### 2. 커스텀 아이콘 사용

```tsx
const navItems = [
  {
    icon: <HomeIcon />,
    label: "홈",
    path: "/home",
  },
  {
    icon: <SearchIcon />,
    label: "검색",
    path: "/search",
  },
];

<NavigationBar items={navItems} />
```

#### 3. 자동 활성화 상태 (현재 경로 기반)

```tsx
// NavigationBar는 현재 pathname을 자동으로 감지하여
// 해당하는 메뉴를 활성화 상태로 표시합니다
const navItems = [
  { icon: null, label: "컬렉션", path: "/home" },      // icon이 null이면 기본 DiamondIcon 사용
  { icon: null, label: "프로젝트", path: "/projects" },
  { icon: null, label: "마이", path: "/my" },
];

<NavigationBar items={navItems} />
```

## 전체 레이아웃 예시

```tsx
import Header from "@/components/layout/Header";
import NavigationBar, { DiamondIcon } from "@/components/layout/NavigationBar";

const MyPage = () => {
  const navItems = [
    { icon: <DiamondIcon isActive={true} />, label: "컬렉션", path: "/home" },
    { icon: <DiamondIcon isActive={false} />, label: "프로젝트", path: "/projects" },
    { icon: <DiamondIcon isActive={false} />, label: "마이", path: "/my" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header 
        variant="center" 
        title="페이지 제목"
        showBackButton
      />
      
      <main className="flex-1 p-4">
        {/* 페이지 컨텐츠 */}
      </main>
      
      <NavigationBar items={navItems} />
    </div>
  );
};
```
