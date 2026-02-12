import { test as base } from "@playwright/test";

// 공통 fixture를 확장할 때 이 파일을 사용합니다.
// 예: 커스텀 page, 공유 데이터 등

export const test = base;
export { expect } from "@playwright/test";
