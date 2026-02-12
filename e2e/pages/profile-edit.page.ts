import type { Page } from "@playwright/test";

export class ProfileEditPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/profile/edit");
  }
}
