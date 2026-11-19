# Test Cases: Section 9 Alerts

**Application Used:** Automation Practice Playground
**URL:** https://www.sreenidhirajakrishnan.com/practice
**Section covered:** Section 9: Alerts

**What the section says:** Practise handling native JS dialogs: alert, confirm and prompt.

**Verified on:** 17 November 2026 against the live page. The dialog messages and result strings below were checked in the browser.

**Precondition for every test case:**

- The browser is open.
- The URL is loaded successfully.
- Section 9 is visible (scroll to it if needed).
- No dialog is currently open.
- The result line shows `No interaction yet`, unless the test case says otherwise.
- Each test case starts with a fresh page load so that no result or dialog state is left from an earlier test.

---

## 1. Verified Page Facts

### 1.1 Elements in Section 9

| Element | id | data-testid | aria-label | Visible text |
|---|---|---|---|---|
| Show Alert button | `alert-btn` | `alert-btn` | `Show alert` | `Show Alert` |
| Show Confirm button | `confirm-btn` | `confirm-btn` | `Show confirm` | `Show Confirm` |
| Show Prompt button | `prompt-btn` | `prompt-btn` | `Show prompt` | `Show Prompt` |
| Result line | — | `alert-result` | — | `No interaction yet` (initial) |
| Section container | `section-9` | — | — | `Section 9: Alerts` |

**Note:** The `aria-label` values are lower-case after the first word. The accessible names are therefore `Show alert`, `Show confirm` and `Show prompt`, while the visible button text is title case.

### 1.2 Dialog behaviour

| Trigger | Dialog type | Dialog message | Dialog default value | User action | Result line |
|---|---|---|---|---|---|
| Show Alert | `alert` | `This is a practice alert` | Empty | Accept | `Alert was shown and dismissed` |
| Show Alert | `alert` | `This is a practice alert` | Empty | Dismiss | `Alert was shown and dismissed` |
| Show Confirm | `confirm` | `Do you confirm this action?` | Empty | Accept | `Confirm result: OK` |
| Show Confirm | `confirm` | `Do you confirm this action?` | Empty | Dismiss | `Confirm result: Cancel` |
| Show Prompt | `prompt` | `Enter a value:` | Empty | Accept with text | `Prompt value: <text>` |
| Show Prompt | `prompt` | `Enter a value:` | Empty | Accept with empty value | `Prompt value: ` followed by one trailing space |
| Show Prompt | `prompt` | `Enter a value:` | Empty | Dismiss | `Prompt value: (cancelled)` |

**Auto-dismiss note:** If no dialog handler is registered, Playwright automatically dismisses native dialogs. The page then shows:

| Trigger | Result when the dialog is auto-dismissed |
|---|---|
| Show Alert | `Alert was shown and dismissed` |
| Show Confirm | `Confirm result: Cancel` |
| Show Prompt | `Prompt value: (cancelled)` |

### 1.3 Prompt test data

| Value accepted in the prompt | Expected result line |
|---|---|
| `Playwright` | `Prompt value: Playwright` |
| Empty value | `Prompt value: ` with one trailing space |
| `  Hello @123  ` | `Prompt value:   Hello @123  ` (all spaces preserved) |
| `<b>bold</b>` | `Prompt value: <b>bold</b>` (shown as literal text, not HTML) |
| `0` | `Prompt value: 0` (not treated as cancelled) |
| `null` | `Prompt value: null` (not treated as cancelled) |
| `Cancel` | `Prompt value: Cancel` (not treated as cancelled) |
| `key:value` | `Prompt value: key:value` |
| 200 `a` characters | `Prompt value: ` followed by all 200 `a` characters |
| `Héllo 😀 日本語` | `Prompt value: Héllo 😀 日本語` (verify on your browser) |

**Important:** Result text is case-sensitive and punctuation-sensitive. Check the exact strings, including the trailing space for an empty prompt.

### 1.4 Exact result strings

| State | Exact text |
|---|---|
| Before any interaction | `No interaction yet` |
| Alert handled | `Alert was shown and dismissed` |
| Confirm accepted | `Confirm result: OK` |
| Confirm dismissed | `Confirm result: Cancel` |
| Prompt accepted with text | `Prompt value: <text>` |
| Prompt accepted empty | `Prompt value: ` with one trailing space |
| Prompt dismissed | `Prompt value: (cancelled)` |

---

## 2. Test Cases

### 2.1 Page Load and UI Validation

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 1 | Page loads | Open https://www.sreenidhirajakrishnan.com/practice | Page loads successfully; Section 9 is present on the page |
| 2 | Section heading | Scroll to Section 9 | Heading is visible with the exact text `Section 9: Alerts` |
| 3 | Section description | Read the text below the heading | Text is `Practise handling native JS dialogs: alert, confirm and prompt.` |
| 4 | Three buttons visible | Look inside Section 9 | `Show Alert`, `Show Confirm` and `Show Prompt` are all visible |
| 5 | Button labels | Read each button label | Text is exactly `Show Alert`, `Show Confirm` and `Show Prompt` |
| 6 | Buttons enabled | Check the state of all three buttons | All three buttons are enabled and clickable |
| 7 | Element attributes | Inspect each element | `id`, `data-testid` and `aria-label` match the values in section 1.1 |
| 8 | Accessible names | Check the accessible name of each button | `Show alert`, `Show confirm` and `Show prompt` |
| 9 | Initial result | Read the result line before clicking any button | Text is exactly `No interaction yet` |
| 10 | No dialog on page load | Wait a moment after the page loads without clicking a button | No browser dialog opens; 
no modal overlay appears; the URL does not change; the page remains interactive |

### 2.2 Show Alert

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 11 | Alert opens | Click `Show Alert` and watch the browser | Exactly one native alert dialog opens |
| 12 | Alert type | Check the dialog type | Dialog type is `alert` |
| 13 | Alert message | Read the dialog message | Message is exactly `This is a practice alert` |
| 14 | Alert default value | Check the dialog default value | Default value is empty |
| 15 | Accept alert | Click `Show Alert`, then accept the dialog | Result line shows `Alert was shown and dismissed` |
| 16 | Dismiss alert | Click `Show Alert`, then dismiss the dialog | Result line still shows `Alert was shown and dismissed` |
| 17 | Accept alert with text | Click `Show Alert`, then accept the dialog with extra text (edge case) | Extra text is ignored; no error occurs; result line shows `Alert was shown and dismissed` |
| 18 | Auto-dismiss alert | Click `Show Alert` without registering a dialog handler | Dialog is dismissed automatically; result line shows `Alert was shown and dismissed` |
| 19 | Repeat alert | Click `Show Alert` twice, handling each dialog | Two alerts open, one per click; the result line shows `Alert was shown and dismissed` after each one |
| 20 | Double-click alert | Double-click `Show Alert`, handling both dialogs | Two alerts open; the result line shows `Alert was shown and dismissed` |
| 21 | Exact alert result | Read the result line after handling the alert | Text is exactly `Alert was shown and dismissed`; no `OK` or `Cancel` text is added |
| 22 | Button remains enabled | Check `Show Alert` after handling the dialog | Button is still visible and enabled |
| 23 | URL unchanged | Check the address bar after handling the alert | URL is still the `/practice` page; the page has not reloaded or navigated away |
| 24 | Result updates in place | Count the result lines before and after handling the alert | There is only one result line; its text changes and no duplicate result line is added |

### 2.3 Show Confirm

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
| 38 | Result updates in place | Count the result lines before and after handling the confirm | There is only one result line; its text changes and no duplicate result line is added |

### 2.4 Show Prompt

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

### 2.5 State, Sequence and Reset

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 61 | Initial state | Load the page and read the result line | Text is exactly `No interaction yet` |
| 62 | Alert then confirm | Accept the alert, then accept the confirm | Result line shows the confirm result `Confirm result: OK` |
| 63 | Confirm then prompt | Accept the confirm, then accept a prompt with `Playwright` | Result line shows the prompt result `Prompt value: Playwright` |
| 64 | Prompt then alert | Accept a prompt with `Playwright`, then accept the alert | Result line shows the alert result `Alert was shown and dismissed` |
| 65 | All three in order | Handle the alert, then the confirm, then the prompt | Each dialog has the correct type and message; the final result line shows the prompt value |
| 66 | Result persists | Handle any dialog, then wait 2 seconds without doing anything | Result line still shows the same text; it does not clear automatically |
| 67 | Reload resets | Handle a dialog, then reload the page | Result line goes back to `No interaction yet` |
| 68 | Back navigation resets | Handle a dialog, navigate to another page, then go back to the practice page | Result line shows `No interaction yet` (verified in Chromium; verify in other browsers) |
| 69 | Other sections still work | Handle an alert, then use Section 8 sort or pagination | Section 8 controls still work normally |
| 70 | Other section state is unaffected | Set Section 8 sort to `Sort Name (desc)`, go to page 2, then handle an alert | Section 8 still shows the descending sort and page 2; the alert result updates independently |

### 2.6 Accessibility, Responsive and Cross-Browser

| S.No | Test Scenario | Steps | Expected Result |
|---|---|---|---|
| 71 | Tab order | Focus `Show Alert`, then press Tab twice | Focus moves to `Show Confirm`, then to `Show Prompt` |
| 72 | Enter key | Focus each button and press Enter | The same dialog opens as with a mouse click, and the result updates |
| 73 | Space key | Focus each button and press Space | The same dialog opens as with a mouse click, and the result updates |
| 74 | Focus indicator | Tab through the three buttons | Each focused button has a visible focus indicator (visual check) |
| 75 | Mobile viewport | Set the viewport to 375 x 667, reload the page and scroll to Section 9 | All three buttons are visible and usable; dialogs open and results update normally |
| 76 | Chromium | Run all Section 9 test cases in Chromium | Dialog types, messages, default values and result strings match this document |
| 77 | Firefox | Run all Section 9 test cases in Firefox | Dialog types, messages, default values and result strings match this document |
| 78 | WebKit | Run all Section 9 test cases in WebKit | Dialog types, messages, default values and result strings match this document |
| 79 | No custom modal | Click each dialog button and handle the dialog | No Section 10 modal overlay appears; only the native browser dialog and the result line are involved |
| 80 | No page errors | Click each dialog button and handle the dialogs with accept and cancel | No uncaught page error appears; the page remains responsive after every dialog |

---

## 3. Notes

- Native browser dialogs are not part of the page DOM. They cannot be found with normal element locators such as a button or heading locator. The automation tool's dialog handling feature must be used.
- The result line has no `aria-live` attribute. Screen readers may not announce the result change automatically.
- The `aria-label` value and the visible button text use different casing. Use the exact value that your locator strategy expects.
- For the empty prompt, the result text really ends with a space. Some assertion libraries trim or normalise whitespace, so check the exact text content if this trailing space is important.
- The alert has only one button in the browser UI. Accepting and dismissing it both close it and both produce the same result text.
- For the prompt, accepting with an empty value is different from cancelling. Empty means `Prompt value: `; cancelling means `Prompt value: (cancelled)`.
- `0`, `null` and `Cancel` are ordinary prompt values, not cancel signals.
- A double-click sends two clicks, so it can open two dialogs. Handle both dialogs or expect the second one to be auto-dismissed.
