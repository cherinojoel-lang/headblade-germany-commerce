import { expect, test } from "@playwright/test";

test("review preview loads safely and product decision journey works", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await expect(page).toHaveTitle(/HeadBlade/i);
  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.getByText(/Review-Preview/i).first()).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);

  await page.getByRole("link", { name: "MOTO entdecken" }).click();
  await expect(page).toHaveURL(/\/produkt\/headblade-moto\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "HeadBlade MOTO" })).toBeVisible();
  await expect(page.getByText(/Checkout bewusst deaktiviert/i)).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);

  await page.getByRole("link", { name: "Passenden Vergleich öffnen" }).click();
  await expect(page).toHaveURL(/\/vergleich\/moto-vs-atx\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: /MOTO oder ATX/i })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/produkt\/headblade-moto\/?$/);
  await page.getByRole("link", { name: "Zur Produktübersicht" }).click();
  await expect(page).toHaveURL(/\/produkte\/?$/);
  await expect(page.locator("article.product-card").filter({ has: page.getByRole("heading", { name: "HeadBlade MOTO" }) })).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("core review routes keep accessible navigation and one primary heading", async ({ page }, testInfo) => {
  for (const path of ["/", "/finder/", "/vergleich/moto-vs-atx/", "/produkt/headblade-moto/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
  }

  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Zum Inhalt springen" });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();

  if (testInfo.project.name.includes("mobile")) {
    const menu = page.locator("details.mobile-nav");
    const summary = menu.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    await expect(menu.getByRole("link", { name: "Vergleichen" })).toBeVisible();
  }

  await page.goto("/vergleich/moto-vs-atx/");
  await expect(page.locator("table caption")).toContainText(/MOTO und ATX/i);
});
