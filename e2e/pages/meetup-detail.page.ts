import type { Page } from "@playwright/test";

export class MeetupDetailPage {
  constructor(private page: Page) {}

  async goto(id: string) {
    await this.page.goto(`/meetups/${id}`);
  }
}
