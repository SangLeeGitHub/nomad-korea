import type { Page } from "@playwright/test";

export class MeetupListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/meetups");
  }
}
