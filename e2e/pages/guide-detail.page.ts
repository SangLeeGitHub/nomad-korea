import type { Page } from "@playwright/test";

export class GuideDetailPage {
  constructor(private page: Page) {}

  async goto(slug: string) {
    await this.page.goto(`/guides/${slug}`);
  }
}
