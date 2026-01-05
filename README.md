# 🚀 Waypoint FE

Waypoint 프론트엔드 프로젝트입니다.

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Language** | TypeScript |
| **Framework** | Next.js 16.1.1 |
| **UI Library** | React 19.2.3 |
| **Styling** | Tailwind CSS 4 |
| **Package Manager** | npm |

## ⚙️ Getting Started

### Installation

```bash
# 저장소 복제
git clone https://github.com/way-po-int/waypoint-FE.git

# 프로젝트 디렉토리로 이동
cd waypoint-fe

# 의존성 설치
npm install
```

### Development

```bash
# 로컬 개발 서버 실행
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📝 Convention

### Commit Message Convention

협업 시 커밋 로그의 가독성을 위해 아래 규칙을 엄수합니다.

**Format:** `type(scope): Subject [Jira-Key]`

- **Type**: 소문자로 작성, 콜론(:) 뒤에만 한 칸 띄움.
- **Scope**: 부가 설명은 세부 사항 대신 큰 범위의 컴포넌트 명칭 사용.
- **Subject**: 한글 사용, 동명사로 종결, 과거시제/특수기호 미사용.
- **Body**: 단위가 큰 커밋일 경우 변경 사유와 상세 내용을 기술.

| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 구현 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅 (로직 변경 없음) |
| `refactor` | 코드 리팩토링 |
| `chore` | 빌드 업무, 패키지 설정 수정 |

**Example:** `feat(login): 로그인 기능 구현 [WAPO-123]`

### Pull Request Convention

- **PR 제목**: Commit Message Convention을 따르되, 맨 뒤에 Jira 키를 대괄호로 감싸 작성합니다.
- **Merge 규칙**: PR을 Merge할 때 해당 제목을 Merge Commit Message로 사용합니다.

#### PR Template

```markdown
## 📝 변경 사항

- 핵심 변경 내용을 간략히 작성하세요.

## 🔍 변경사항 세부 설명

- 변경 이유와 상세 구현 내용을 작성하세요.

## 📸 스크린샷

- UI 변경이 있는 경우 첨부하세요.

## 💬 기타

- 리뷰어에게 전달할 특이사항을 작성하세요.
```

## 📁 Project Structure

```
waypoint-fe/
├── app/              # Next.js App Router (Page, Layout)
├── components/       # 공통 컴포넌트
├── constants/        # 상수 정의
├── hooks/           # 커스텀 훅
├── styles/          # Tailwind Global Styles
├── types/           # TypeScript 인터페이스/타입 정의
└── utils/           # 공용 유틸리티 함수
```
