import { test as base } from "@playwright/test";

// 인증된 사용자 상태를 재사용하는 fixture
// storageState를 활용하여 로그인 과정을 매 테스트마다 반복하지 않습니다.
//
// 사용 예:
// import { test, expect } from "../fixtures/auth.fixture";
//
// test("프로필 페이지 접근", async ({ authenticatedPage }) => {
//   await authenticatedPage.goto("/profile");
// });

export const test = base;
export { expect } from "@playwright/test";
