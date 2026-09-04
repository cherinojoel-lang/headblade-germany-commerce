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

test("Motion Lab is progressive, source-faithful and reduced-motion safe", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const heroEyebrow = page.locator(".hero__copy > .eyebrow");
  const heroImage = page.locator(".hero__visual img");
  const contourAccent = page.locator(".contour-intro .contour-line__accent");

  await expect(heroImage).toHaveAttribute("src", /headblade\.info\//);

  expect(await heroEyebrow.evaluate((node) => getComputedStyle(node).animationName)).toBe("hb-motion-rise");
  expect(await heroImage.evaluate((node) => getComputedStyle(node).animationName)).toBe("hb-motion-product");
  expect(await contourAccent.evaluate((node) => getComputedStyle(node).animationName)).toBe("hb-contour-draw");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();

  expect(await heroEyebrow.evaluate((node) => getComputedStyle(node).animationName)).toBe("none");
  expect(await heroImage.evaluate((node) => getComputedStyle(node).animationName)).toBe("none");
  expect(await contourAccent.evaluate((node) => getComputedStyle(node).animationName)).toBe("none");
});
