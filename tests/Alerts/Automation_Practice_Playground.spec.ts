import {
  test,
  expect,
  chromium,
  Locator,
  BrowserContext,
  Browser,
  Page,
  Dialog,
} from "@playwright/test";
let browser: Browser;
let context: BrowserContext;
let page: Page;
let showAlertBtn: Locator;
let confirmAleartBtn: Locator;
let ShowPromtBtn: Locator;
let resultLine: Locator;
let sectionContainer: Locator;
test.beforeEach("Launch site", async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.sreenidhirajakrishnan.com/practice");
  await expect(page).toHaveTitle(
    "Free Automation Practice Playground: Selenium, Playwright, Cypress, Robot Framework | Sreenidhi Rajakrishnan",
  );
  await expect(page.locator("#section-9")).toBeVisible();
  showAlertBtn = page.getByTestId("alert-btn");
  confirmAleartBtn = page.getByTestId("confirm-btn");
  ShowPromtBtn = page.locator("#prompt-btn");
  resultLine = page.getByTestId("alert-result");
  sectionContainer = page.locator("#section-9");
});
test("2.1 Page Load and UI Validation", async () => {
  await expect(sectionContainer).toBeVisible();
  await expect(sectionContainer.locator("h2")).toHaveText("Section 9: Alerts");
  await expect(sectionContainer.locator("p").nth(0)).toHaveText(
    "Practise handling native JS dialogs: alert, confirm and prompt.",
  );
  await expect(showAlertBtn).toBeVisible();
  await expect(confirmAleartBtn).toBeVisible();
  await expect(ShowPromtBtn).toBeVisible();
  await expect(showAlertBtn).toBeEnabled();
  await expect(confirmAleartBtn).toBeEnabled();
  await expect(ShowPromtBtn).toBeEnabled();
  await expect(resultLine).toHaveText("No interaction yet");
});
/* 2.2 Show Alert

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 11 | Alert opens | Click `Show Alert` and watch the browser | Exactly one native alert dialog opens |
| 12 | Alert type | Check the dialog type | Dialog type is `alert` |
| 13 | Alert message | Read the dialog message | Message is exactly `This is a practice alert` |
| 14 | Alert default value | Check the dialog default value | Default value is empty |
| 15 | Accept alert | Click `Show Alert`, then accept the dialog | Result line shows `Alert was shown and dismissed` |
| 16 | Dismiss alert | Click `Show Alert`, then dismiss the dialog | Result line still shows `Alert was shown and dismissed` |
| 17 | Accept alert with text | Click `Show Alert`, then accept the dialog with extra text (edge case) | Extra text is ignored; no error occurs; resultLine .toHaveText("");line shows `Alert was shown and dismissed` |
| 18 | Auto-dismiss alert | Click `Show Alert` without registering a dialog handler | Dialog is dismissed automatically; resultLine .toHaveText("");line shows `Alert was shown and dismissed` |
| 19 | Repeat alert | Click `Show Alert` twice, handling each dialog | Two alerts open, one per click; the resultLine .toHaveText("");line shows `Alert was shown and dismissed` after each one |
| 20 | Double-click alert | Double-click `Show Alert`, handling both dialogs | Two alerts open; the resultLine .toHaveText("");line shows `Alert was shown and dismissed` |
| 21 | Exact alert resultLine .toHaveText("");| Read the resultLine .toHaveText("");line after handling the alert | Text is exactly `Alert was shown and dismissed`; no `OK` or `Cancel` text is added |
| 22 | Button remains enabled | Check `Show Alert` after handling the dialog | Button is still visible and enabled |
| 23 | URL unchanged | Check the address bar after handling the alert | URL is still the `/practice` page; the page has not reloaded or navigated away |
| 24 | Result updates in place | Count the resultLine .toHaveText("");lines before and after handling the alert | There is only one resultLine .toHaveText("");line; its text changes and no duplicate resultLine .toHaveText("");line is added |
 */
test("2.2 Show Alert", async () => {
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toBe("alert");
    expect(dialog.defaultValue()).toBe("");
    expect(dialog.message()).toBe("This is a practice alert");
    //dialog.accept();
    dialog.dismiss();
  });
  await showAlertBtn.click();
  await expect(resultLine).toHaveText("Alert was shown and dismissed");
  await showAlertBtn.click();
  await showAlertBtn.dblclick();
  await expect(resultLine).toHaveText("Alert was shown and dismissed");
  await expect(showAlertBtn).toBeVisible();
  await expect(showAlertBtn).toBeEnabled();
  await expect(page).toHaveURL(
    "https://www.sreenidhirajakrishnan.com/practice",
  );
  await expect(resultLine).toHaveText("Alert was shown and dismissed");
});
/* 2.3 Show Confirm

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 25 | Confirm opens | Click `Show Confirm` and watch the browser | Exactly one native confirm dialog opens |
| 26 | Confirm type | Check the dialog type | Dialog type is `confirm` |
| 27 | Confirm message | Read the dialog message | Message is exactly `Do you confirm this action?` |
| 28 | Confirm default value | Check the dialog default value | Default value is empty |
| 29 | Accept confirm | Click `Show Confirm`, then accept the dialog | Result line shows `Confirm result: OK` |
| 30 | Dismiss confirm | Click `Show Confirm`, then dismiss the dialog | Result line shows `Confirm result: Cancel` |
| 31 | Auto-dismiss confirm | Click `Show Confirm` without registering a dialog handler | Dialog is dismissed automatically; result line shows `Confirm result: Cancel` |
| 32 | Accept confirm with text | Click `Show Confirm`, then accept the dialog with extra text (edge case) | Extra text is ignored; no error occurs; result line shows `Confirm result: OK` |
| 33 | Accept then dismiss | Click `Show Confirm` and accept it; click `Show Confirm` again and dismiss it | Result line shows `Confirm result: Cancel` after the second dialog |
| 34 | Dismiss then accept | Click `Show Confirm` and dismiss it; click `Show Confirm` again and accept it | Result line shows `Confirm result: OK` after the second dialog |
| 35 | Double-click confirm | Double-click `Show Confirm` and accept both dialogs | Two dialogs open; result line shows `Confirm result: OK` at the end |
| 36 | Button remains enabled | Check `Show Confirm` after handling the dialog | Button is still visible and enabled |
| 37 | URL unchanged | Check the address bar after handling the confirm | URL is still the `/practice` page; the page has not reloaded or navigated away |
| 38 | Result updates in place | Count the result lines before and after handling the confirm | There is only one result line; its text changes and no duplicate result line is added | */
test("2.3 Show Confirm", async () => {
  async function clickConfirm(action: "accept" | "dismiss") {
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Do you confirm this action?");
      expect(dialog.defaultValue()).toBe("");
      if (action === "accept") await dialog.accept();
      else await dialog.dismiss();
    });
    await confirmAleartBtn.click();
  }

  clickConfirm("accept");
  await expect(resultLine).toHaveText("Confirm result: OK");
  clickConfirm("dismiss");
  await expect(resultLine).toHaveText("Confirm result: Cancel");
  clickConfirm("accept");
  await expect(resultLine).toHaveText("Confirm result: OK");
  clickConfirm("dismiss");
  await expect(resultLine).toHaveText("Confirm result: Cancel");
  let dialogCount = 0;
  const acceptAll = async (dialog: Dialog) => {
    dialogCount++;
    await dialog.accept();
  };
  page.on("dialog", acceptAll);
  await confirmAleartBtn.dblclick();
  page.off("dialog", acceptAll);
  expect(dialogCount).toBe(2);
  await expect(resultLine).toHaveText("Confirm result: OK");
  await expect(confirmAleartBtn).toBeVisible();
  await expect(confirmAleartBtn).toBeEnabled();
  await expect(page).toHaveURL(
    "https://www.sreenidhirajakrishnan.com/practice",
  );
  expect(await resultLine).toHaveCount(1);
});
