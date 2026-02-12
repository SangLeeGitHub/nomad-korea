import type { Page } from "@playwright/test";

export class ForumDetailPage {
  constructor(private page: Page) {}

  async goto(id: string) {
    await this.page.goto(`/community/forum/${id}`);
  }
}
