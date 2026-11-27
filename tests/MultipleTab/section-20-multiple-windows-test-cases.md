# Test Cases: Section 20 Multiple Windows (Multiple Tabs)

**Application Used:** Automation Practice Playground
**URL:** https://www.sreenidhirajakrishnan.com/practice#section-20
**Section covered:** Section 20: Multiple Windows

**What the section says:** Practise switching between window/tab handles after opening a new one.

**Verified on:** 27 November 2026 against the live page. The element attributes, result strings and new-tab behaviour below were checked in the rendered HTML and page source.

**Precondition for every test case:**

- The browser context allows popups (Playwright allows them by default in a normal browser context).
- The URL is loaded successfully and Section 20 is visible (scroll to it if needed).
- Each test case starts with a fresh page load, so the result text and the number of open pages are known.
- Only one page is open at the start of the test.
- The `page` event listener is registered **before** clicking the button, otherwise the new tab can be missed.

---

## 1. Verified Page Facts

### 1.1 Elements

| Element | id | data-testid | aria-label | Visible text / initial state |
|---|---|---|---|---|
| Open tab button | `open-window-btn` | `open-window-btn` | `Open new window` | `Open New Tab` |
| Result line | — | `window-result` | — | `No window opened` |
| Section container | `section-20` | — | — | `Section 20: Multiple Windows` |

### 1.2 Behaviour confirmed in the page code

| Action | What the page does | Result line after the action |
|---|---|---|
| Click `Open New Tab` | Calls `window.open("about:blank", "_blank")`, then updates the result text | `New window/tab opened` |

**Important:** The new tab is `about:blank`. It has no URL to navigate to and no page content to assert. The parent page does not navigate, reload, or lose its state.

### 1.3 Exact strings to assert

| State | Exact text |
|---|---|
| Result before clicking | `No window opened` |
| Result after clicking | `New window/tab opened` |
| Parent page URL | `https://www.sreenidhirajakrishnan.com/practice` |
| New tab URL | `about:blank` |

---

## 2. Test Cases

### TC01 — Initial UI validation

| S.No | Step | Action | Expected Result / Assertion |
|---|---|---|---|
| 1 | Navigate | Open `https://www.sreenidhirajakrishnan.com/practice#section-20` | Page loads; `Section 20: Multiple Windows` heading is visible |
| 2 | Check description | Read the text under the heading | Text is `Practise switching between window/tab handles after opening a new one.` |
| 3 | Check button | Locate the open-tab button | Button is visible, enabled, and text is exactly `Open New Tab` |
| 4 | Check attributes | Inspect the button | `id`, `data-testid` and `aria-label` match the values in section 1.1 |
| 5 | Check initial result | Read `window-result` before clicking | Text is exactly `No window opened` |
| 6 | Check page count | Count open pages in the browser context | Exactly 1 page is open |

---

### TC02 — Open a new tab and assert

| S.No | Step | Action | Expected Result / Assertion |
|---|---|---|---|
| 1 | Navigate | Open the practice URL and scroll to Section 20 | Page loads; button is visible and result is `No window opened` |
| 2 | Register listener | Start waiting for the `page` event on the browser context before the click | Listener is ready before any click happens |
| 3 | Open tab | Click `Open New Tab` | Exactly one new page/tab is created |
| 4 | Assert page count | Count pages in the context | Exactly 2 pages are open (parent + new tab) |
| 5 | Assert new tab | Read the new page's URL | URL is exactly `about:blank` |
| 6 | Assert result | Read `window-result` on the parent page | Text is exactly `New window/tab opened` |
| 7 | Assert parent URL | Read the parent page URL | URL is still `https://www.sreenidhirajakrishnan.com/practice`; no navigation happened |

**Playwright hint (for your automation):**

```ts
await page.goto("https://www.sreenidhirajakrishnan.com/practice#section-20");
const button = page.getByTestId("open-window-btn");
const result = page.getByTestId("window-result");
await expect(result).toHaveText("No window opened");

const pagePromise = page.context().waitForEvent("page");
await button.click();
const newPage = await pagePromise;

await expect(newPage).toHaveURL("about:blank");
await expect(result).toHaveText("New window/tab opened");
expect(page.context().pages()).toHaveLength(2);
await expect(page).toHaveURL(/\/practice/);
```

> Note: wait for the `page` event **before** clicking. Registering the listener after the click is a race condition and can miss the new tab.

---

### TC03 — Switch between tabs, close the child, and assert

| S.No | Step | Action | Expected Result / Assertion |
|---|---|---|---|
| 1 | Open tab | Repeat TC02 so the parent and one new tab are open | 2 pages are open; result is `New window/tab opened` |
| 2 | Switch to child | Bring the new tab to the front | New tab is active; its URL is `about:blank` |
| 3 | Switch to parent | Bring the original page to the front | Parent page is active; URL is `/practice` |
| 4 | Parent still works | Read Section 20 heading and result on the parent | Heading is `Section 20: Multiple Windows`; result is still `New window/tab opened` |
| 5 | Close child | Close the new tab | Child tab is gone; no page error occurs |
| 6 | Assert page count | Count pages in the context | Exactly 1 page is open (the parent) |
| 7 | Assert parent state | Read the result line and URL on the parent | Result is still `New window/tab opened`; URL is still `/practice` |
| 8 | Reopen tab | Click `Open New Tab` again after closing the first one | A new tab opens again; result is `New window/tab opened`; 2 pages are open |

**Playwright hint (for your automation):**

```ts
const pagePromise = page.context().waitForEvent("page");
await page.getByTestId("open-window-btn").click();
const child = await pagePromise;

await child.bringToFront();
await expect(child).toHaveURL("about:blank");

await page.bringToFront();
await expect(page.getByTestId("window-result")).toHaveText("New window/tab opened");
await expect(page).toHaveURL(/\/practice/);

await child.close();
expect(page.context().pages()).toHaveLength(1);
await expect(page.getByTestId("window-result")).toHaveText("New window/tab opened");
```

---

## 3. Notes for Automation

- Use `context.waitForEvent("page")` for tabs opened with `window.open`. Do not use `page.waitForEvent("popup")` unless you specifically want a popup window; both can work, but `context` page events are clearer when you also assert the total page count.
- The child page is `about:blank`, so there is no `load` navigation to wait for and no DOM content to check. Assert its URL and the parent's result line instead.
- Result text is case-sensitive: `New window/tab opened` includes the slash and lower-case `tab`.
- `context.pages()` includes the original page and every tab still open. Close tabs you create so parallel tests do not see leftover pages.
- Always switch back to the parent page (`bringToFront()`) before asserting on the parent's UI; otherwise you may still be acting on the blank child page.
- Assertion checklist: initial result, new page event, 2 pages open, child URL, updated parent result, unchanged parent URL, then 1 page after closing the child.
