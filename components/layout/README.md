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

## 전체 레이아웃 예시

```tsx
const MyPage = () => {
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
    </div>
  );
};
```
