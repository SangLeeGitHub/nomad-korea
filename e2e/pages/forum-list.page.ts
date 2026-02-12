import type { Page } from "@playwright/test";

export class ForumListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/community/forum");
  }
}
