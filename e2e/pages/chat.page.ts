import type { Page } from "@playwright/test";

export class ChatPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/community/chat");
  }
}
