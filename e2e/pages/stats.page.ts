import type { Page } from "@playwright/test";

export class StatsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/stats");
  }
}
