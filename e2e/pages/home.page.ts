import type { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly logo: Locator;
  readonly cityCards: Locator;
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly costSlider: Locator;
  readonly resultCount: Locator;

  constructor(private page: Page) {
    this.logo = page.getByRole('link', { name: '노마드코리아' });
    this.cityCards = page.locator('a[href^="/cities/"]').filter({ hasText: '상세 보기' });
    this.searchInput = page.getByPlaceholder("도시명, 지역, 특징 검색...");
    this.sortSelect = page.locator('button[role="combobox"]');
    this.costSlider = page.locator('[role="slider"]');
    this.resultCount = page.locator('text=/\\d+개 도시가 검색되었습니다/');
  }

  async goto() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async getResultCount(): Promise<number> {
    const text = await this.resultCount.textContent();
    const match = text?.match(/(\d+)개/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
