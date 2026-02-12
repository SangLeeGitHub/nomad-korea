import type { Page } from "@playwright/test";

export class GuideListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/guides");
  }
}
