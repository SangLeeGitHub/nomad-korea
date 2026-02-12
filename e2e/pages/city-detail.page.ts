import type { Page } from "@playwright/test";

export class CityDetailPage {
  constructor(private page: Page) {}

  async goto(slug: string) {
    await this.page.goto(`/cities/${slug}`);
  }
}
