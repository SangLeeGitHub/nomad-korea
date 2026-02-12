# Nomad Korea - Project Guide

## E2E 테스트 (Playwright)

### 폴더 구조

```
e2e/
├── playwright.config.ts          # Playwright 설정
├── fixtures/
│   ├── base.fixture.ts           # 공통 fixture (test/expect re-export)
│   └── auth.fixture.ts           # 인증된 사용자 fixture
├── pages/                        # Page Object Model
│   ├── home.page.ts
│   ├── login.page.ts
│   ├── register.page.ts
│   ├── city-list.page.ts
│   ├── city-detail.page.ts
│   ├── guide-list.page.ts
│   ├── guide-detail.page.ts
│   ├── forum-list.page.ts
│   ├── forum-detail.page.ts
│   ├── chat.page.ts
│   ├── meetup-list.page.ts
│   ├── meetup-detail.page.ts
│   ├── profile.page.ts
│   ├── profile-edit.page.ts
│   └── stats.page.ts
├── specs/                        # 테스트 파일 (app/ 라우트 구조 반영)
│   ├── auth/
│   ├── home/
│   ├── cities/
│   ├── guides/
│   ├── community/
│   ├── meetups/
│   ├── profile/
│   └── stats/
└── helpers/
    └── test-data.ts              # 공통 상수 (ROUTES 등)
```

### 실행 스크립트

```bash
npm run test:e2e          # Headless 실행
npm run test:e2e:ui       # Playwright UI 모드
npm run test:e2e:headed   # 브라우저 창 표시하며 실행
```

### 아키텍처 패턴

- **Page Object Model**: `e2e/pages/`에 각 페이지의 locator와 액션을 캡슐화. UI가 변경되면 Page Object만 수정.
- **Fixtures**: `e2e/fixtures/`에서 `test.extend()`로 커스텀 fixture 정의. 인증 상태는 `storageState`로 저장하여 재사용.
- **Specs**: `e2e/specs/`는 `app/` 라우트 구조를 그대로 반영. 리스트와 상세 페이지를 분리.

### 테스트 작성 컨벤션

- spec 파일에서는 `@playwright/test` 대신 `../../fixtures/base.fixture`에서 `test`, `expect`를 import
- 인증이 필요한 테스트는 `../../fixtures/auth.fixture`에서 import
- 라우트 상수는 `../../helpers/test-data.ts`의 `ROUTES` 사용
- 파일 네이밍: Page Object는 `*.page.ts`, 테스트는 `*.spec.ts`

### 설정 요약 (`playwright.config.ts`)

- 브라우저: Chromium (Desktop Chrome)
- Base URL: `http://localhost:3000`
- 실패 시 스크린샷 자동 캡처
- 첫 번째 재시도 시 trace 기록
- CI 환경에서는 재시도 2회, 단일 worker
- `npm run dev`로 dev 서버 자동 시작 (기존 서버 재사용 가능)
