import type { Page } from "@playwright/test";

export class CityListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/cities");
  }
}
