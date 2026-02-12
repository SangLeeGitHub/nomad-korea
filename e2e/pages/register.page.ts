import type { Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/register");
  }
}
