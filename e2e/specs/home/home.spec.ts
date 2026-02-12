import { test, expect } from "../../fixtures/base.fixture";
import { HomePage } from "../../pages/home.page";

const TOTAL_CITIES = 10;

test.describe("홈 페이지", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("로고가 헤더에 표시된다", async () => {
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.logo).toHaveAttribute("href", "/");
  });

  test("도시 카드들이 표시된다", async () => {
    await expect(homePage.cityCards.first()).toBeVisible();
    const count = await homePage.cityCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("초기 접속 시 필터가 적용되지 않은 상태이다", async () => {
    await expect(homePage.searchInput).toHaveValue("");
    await expect(homePage.sortSelect).toHaveText(/종합 점수/);
  });

  test("필터 미적용 시 DB의 모든 도시가 표시된다", async () => {
    const resultCount = await homePage.getResultCount();
    expect(resultCount).toBe(TOTAL_CITIES);

    const cardCount = await homePage.cityCards.count();
    expect(cardCount).toBe(TOTAL_CITIES);
  });
});
