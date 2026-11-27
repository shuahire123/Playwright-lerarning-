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
/* 2.4 Show Prompt

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 39 | Prompt opens | Click `Show Prompt` and watch the browser | Exactly one native prompt dialog opens |
| 40 | Prompt type | Check the dialog type | Dialog type is `prompt` |
| 41 | Prompt message | Read the dialog message | Message is exactly `Enter a value:` |
| 42 | Prompt default value | Check the dialog default value | Default value is empty |
| 43 | Accept normal text | Click `Show Prompt`, type `Playwright` and accept | Result line shows `Prompt value: Playwright` |
| 44 | Accept empty value | Click `Show Prompt` and accept without typing anything | Result line shows `Prompt value: ` with one trailing space after the colon |
| 45 | Spaces are preserved | Click `Show Prompt`, type `  Hello @123  ` and accept | Result line preserves every space exactly: `Prompt value:   Hello @123  ` |
| 46 | HTML is literal | Click `Show Prompt`, type `<b>bold</b>` and accept | Result line shows `Prompt value: <b>bold</b>` as text; the HTML is not rendered |
| 47 | Zero is not cancel | Click `Show Prompt`, type `0` and accept | Result line shows `Prompt value: 0`; it is not treated as cancelled |
| 48 | Null is not cancel | Click `Show Prompt`, type `null` and accept | Result line shows `Prompt value: null`; it is not treated as cancelled |
| 49 | Long text | Click `Show Prompt`, type 200 `a` characters and accept | Result line shows all 200 characters after `Prompt value: `; nothing is truncated |
| 50 | Unicode text | Click `Show Prompt`, type `Héllo 😀 日本語` and accept | Result line shows the same characters exactly |
| 51 | Cancel as text | Click `Show Prompt`, type `Cancel` and accept | Result line shows `Prompt value: Cancel`; it is not treated as a cancelled prompt |
| 52 | Colon in value | Click `Show Prompt`, type `key:value` and accept | Result line shows `Prompt value: key:value` |
| 53 | Cancel prompt | Click `Show Prompt`, then dismiss the dialog | Result line shows `Prompt value: (cancelled)` |
| 54 | Auto-dismiss prompt | Click `Show Prompt` without registering a dialog handler | Dialog is dismissed automatically; result line shows `Prompt value: (cancelled)` |
| 55 | Accept then cancel | Accept a prompt with `first`, then click `Show Prompt` again and dismiss it | Result line shows `Prompt value: (cancelled)` after the second dialog |
| 56 | Cancel then accept | Dismiss a prompt, then click `Show Prompt` again and accept with `second` | Result line shows `Prompt value: second` after the second dialog |
| 57 | Double-click prompt | Double-click `Show Prompt`; accept the first prompt with `first` and the second with `second` | Two dialogs open; the final result line shows `Prompt value: second` |
| 58 | Button remains enabled | Check `Show Prompt` after handling the dialog | Button is still visible and enabled |
| 59 | URL unchanged | Check the address bar after handling the prompt | URL is still the `/practice` page; the page has not reloaded or navigated away |
| 60 | Result updates in place | Count the result lines before and after handling the prompt | There is only one result line; its text changes and no duplicate result line is added |
 */
test("2.4 Show Prompt", async () => {
  let promtClick = async function (
    action: "accept" | "dismiss",
    text?: string,
  ) {
    page.once("dialog", (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Enter a value:");
      expect(dialog.defaultValue()).toBe("");
      if (action === "accept") dialog.accept(text);
      else dialog.dismiss();
    });
    await ShowPromtBtn.click();
  };
  promtClick("accept", "Playwright");
  await expect(resultLine).toHaveText("Prompt value: Playwright");
  promtClick("accept");
  await expect(resultLine).toHaveText("Prompt value: ");
  promtClick("accept", "  Hello @123  ");
  await expect(resultLine).toHaveText("Prompt value:   Hello @123  ");
  promtClick("accept", "<b>bold</b>");
  await expect(resultLine).toHaveText("Prompt value: <b>bold</b>");
  promtClick("accept", "0");
  await expect(resultLine).toHaveText("Prompt value: 0");
  promtClick("accept", "null");
  await expect(resultLine).toHaveText("Prompt value: null");
  promtClick(
    "accept",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  await expect(resultLine).toHaveText(
    "Prompt value: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  promtClick("accept", "Héllo 😀 日本語`");
  await expect(resultLine).toHaveText("Prompt value: Héllo 😀 日本語`");
  promtClick("dismiss");
  await expect(resultLine).toHaveText("Prompt value: (cancelled)");
  promtClick("accept", "0");
  await expect(resultLine).toHaveText("Prompt value: 0");
  promtClick("accept", "key:value");
  await expect(resultLine).toHaveText("Prompt value: key:value");
  await promtClick("accept");
  await promtClick("dismiss");
  await expect(resultLine).toHaveText("Prompt value: (cancelled)");

  await promtClick("dismiss");
  await promtClick("accept");
  await expect(resultLine).toHaveText("Prompt value: ");
  let clickCount = 0;
  const makeAcceptHandler = (text?: string) => async (dialog: Dialog) => {
    clickCount++;
    await dialog.accept(text);
  };
  const acceptFirst = makeAcceptHandler("First"); // keep the reference
  page.on("dialog", acceptFirst);
  await ShowPromtBtn.dblclick();
  page.off("dialog", acceptFirst);
  const acceptSecond = makeAcceptHandler("Second"); // keep the reference
  page.on("dialog", acceptSecond);
  await ShowPromtBtn.dblclick();
  page.off("dialog", acceptSecond); // same reference, so it is removed
  await expect(resultLine).toHaveText("Prompt value: Second");
  await expect(ShowPromtBtn).toBeVisible();
  await expect(ShowPromtBtn).toBeEnabled();
  await expect(page).toHaveURL(
    "https://www.sreenidhirajakrishnan.com/practice",
  );
  expect(resultLine).toHaveCount(1);
});
