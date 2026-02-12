import type { Page } from "@playwright/test";

export class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/profile");
  }
}
