import { expect, test } from "@playwright/test";

test.beforeEach("Open practice page", async ({ page }) => {
  await page.goto("https://www.sreenidhirajakrishnan.com/practice#section-20");
});

test("TC01 — Initial UI validation", async ({ page }) => {
  const section20 = page.locator("#section-20");
  const openTabBtn = page.getByTestId("open-window-btn");
  const resultLine = page.getByTestId("window-result");

  await expect(section20.getByRole("heading")).toHaveText("Section 20: Multiple Windows");
  await expect(
    section20.getByText("Practise switching between window/tab handles after opening a new one.")
  ).toBeVisible();
  await expect(openTabBtn).toBeVisible();
  await expect(openTabBtn).toBeEnabled();
  await expect(openTabBtn).toHaveText("Open New Tab");
  await expect(openTabBtn).toHaveAttribute("aria-label", "Open new window");
  await expect(resultLine).toHaveText("No window opened");
  expect(page.context().pages()).toHaveLength(1);
});

test("TC02 — Open a new tab and assert", async ({ page }) => {
  const openTabBtn = page.getByTestId("open-window-btn");
  const resultLine = page.getByTestId("window-result");

  await expect(resultLine).toHaveText("No window opened");

  const initialPageCount = page.context().pages().length;
  const [childPage] = await Promise.all([
    page.context().waitForEvent("page"),
    openTabBtn.click(),
  ]);

  expect(page.context().pages()).toHaveLength(initialPageCount + 1);
  await expect(childPage).toHaveURL("about:blank");
  await expect(resultLine).toHaveText("New window/tab opened");
  await expect(page).toHaveURL(/\/practice/);

  await childPage.close();
  expect(page.context().pages()).toHaveLength(initialPageCount);
});

test("TC03 — Switch between tabs, close the child, and assert", async ({ page }) => {
  const section20 = page.locator("#section-20");
  const openTabBtn = page.getByTestId("open-window-btn");
  const resultLine = page.getByTestId("window-result");

  const initialPageCount = page.context().pages().length;
  const [childPage] = await Promise.all([
    page.context().waitForEvent("page"),
    openTabBtn.click(),
  ]);

  expect(page.context().pages()).toHaveLength(initialPageCount + 1);
  await expect(childPage).toHaveURL("about:blank");
  await expect(resultLine).toHaveText("New window/tab opened");

  await childPage.bringToFront();
  await expect(childPage).toHaveURL("about:blank");

  await page.bringToFront();
  await expect(section20.getByRole("heading")).toHaveText("Section 20: Multiple Windows");
  await expect(resultLine).toHaveText("New window/tab opened");
  await expect(page).toHaveURL(/\/practice/);

  await childPage.close();
  expect(page.context().pages()).toHaveLength(initialPageCount);
  await expect(resultLine).toHaveText("New window/tab opened");
  await expect(page).toHaveURL(/\/practice/);

  const [reopenedPage] = await Promise.all([
    page.context().waitForEvent("page"),
    openTabBtn.click(),
  ]);

  expect(page.context().pages()).toHaveLength(initialPageCount + 1);
  await expect(reopenedPage).toHaveURL("about:blank");
  await expect(resultLine).toHaveText("New window/tab opened");

  await reopenedPage.close();
});
