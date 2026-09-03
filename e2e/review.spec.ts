import { expect, test } from "@playwright/test";

test("review preview loads safely and product navigation works", async ({ page }) => {
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

  await page.getByRole("link", { name: "Produkte ansehen" }).first().click();
  await expect(page).toHaveURL(/\/produkte\/?$/);
  await expect(page.getByRole("heading", { name: "HeadBlade MOTO" })).toBeVisible();

  await page.getByRole("heading", { name: "HeadBlade MOTO" }).getByRole("link").click();
  await expect(page).toHaveURL(/\/produkt\/headblade-moto\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "HeadBlade MOTO" })).toBeVisible();
  await expect(page.getByText(/Checkout bewusst deaktiviert/i)).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
