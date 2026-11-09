# Test Cases: Section 4 Dropdowns

**Application Used:** Automation Practice Playground
**URL:** https://www.sreenidhirajakrishnan.com/practice
**Section covered:** Section 4: Dropdowns

The section has 4 dropdowns. Each one has its own test case group, so you can write one separate Playwright test for each.

1. Standard select (options: choose…, Red, Green, Blue)
2. Multi-select (options: Java, Python, JavaScript, C#)
3. Custom div dropdown (trigger text: "Choose...")
4. Select populated from state array (options: choose tool…, Selenium, Playwright, Cypress, Appium)

> **Note:** The exact IDs, option values and result formats below have been checked against the live page. The Playwright tests use `data-testid` locators so they do not depend on CSS classes.

---

## 1. Page Load Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 1 | Open the URL https://www.sreenidhirajakrishnan.com/practice | Page should load successfully |
| 2 | Scroll to "Section 4: Dropdowns" | Section heading should be visible |
| 3 | Verify the section description text | Text about standard select, multi-select, custom div dropdown and state select should be visible |
| 4 | Verify all 4 dropdowns are visible in Section 4 | Standard, multi-select, custom div and state select should all be visible |

---

## 2. Standard Select Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 5 | Locate the standard select | Dropdown should be visible & enabled |
| 6 | Verify the default selected option | "choose…" should be shown |
| 7 | Verify the text below the dropdown on page load | Should show "Selected: none" |
| 8 | Count all options | There should be 4 options (choose…, Red, Green, Blue) |
| 9 | Verify the option texts | "choose…", "Red", "Green", "Blue" |
| 10 | Select "Red" by visible text | "Red" should be selected |
| 11 | Verify the "Selected:" text | Text should be `Selected: red` (the page shows the lowercase option value) |
| 12 | Select "Green" by value | The select `value` should be `green` |
| 13 | Select "Blue" by index (index 3) | "Blue" should be selected |
| 14 | Change the selection from "Red" to "Blue" | Only "Blue" should be selected; the text should update |
| 15 | Select "choose…" again | Dropdown shows "choose…"; the result goes back to `Selected: none` |
| 16 | Check that the select does not have the `multiple` attribute | Only one option can be selected at a time |

---

## 3. Multi-Select Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 17 | Locate the multi-select | Dropdown should be visible & enabled |
| 18 | Check the `multiple` attribute | Attribute should be present |
| 19 | Count all options | There should be 4 options |
| 20 | Verify the option texts | "Java", "Python", "JavaScript", "C#" |
| 21 | Verify that nothing is selected on page load | No option should be selected |
| 22 | Verify the text below the multi-select on page load | Should show "Selected: none" |
| 23 | Select "Java" | "Java" should be selected |
| 24 | Select "Java" and "Python" (Ctrl/Cmd + click) | Both should be selected |
| 25 | Select "Java", "JavaScript" and "C#" | These 3 should be selected; "Python" should NOT be selected |
| 26 | Select all 4 options | All 4 should be selected |
| 27 | Deselect "Python" (Ctrl/Cmd + click) | "Python" unselected; the other 3 stay selected |
| 28 | Click "C#" without Ctrl/Cmd | Only "C#" should be selected; all others unselected |
| 29 | Verify the "Selected:" text after choosing 2 or more options | Format: `Selected: java, python` — lowercase values, comma + space, in option order |

---

## 4. Custom Div Dropdown Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 30 | Locate the custom div dropdown | Dropdown should be visible |
| 31 | Verify the default text of the dropdown | Should show "Choose..." |
| 32 | Verify the text below the dropdown on page load | Should show "Selected: Choose..." |
| 33 | Verify the option list before clicking | Option list should NOT be visible (it is not rendered while closed) |
| 34 | Click on the dropdown | Option list should open and be visible |
| 35 | Count and read all options | 3 options: `Alpha`, `Beta`, `Gamma` |
| 36 | Click on one option | The toggle button text changes to the chosen option (e.g. `Alpha`) |
| 37 | Verify the "Selected:" text | Text should be `Selected: Alpha` |
| 38 | Verify the option list after choosing | Menu closes after a selection |
| 39 | Open the dropdown again and choose a different option | New option should be selected; the button and result text should update |
| 40 | Open the dropdown and click outside it | Not implemented: the menu stays open on outside click. Covered by an expected-failure test |

---

## 5. Select Populated from State Array Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 41 | Locate the select | Dropdown should be visible & enabled |
| 42 | Verify the default selected option | "choose tool…" should be shown |
| 43 | Verify the text below the dropdown on page load | Should show "Selected: none" |
| 44 | Count all options | There should be 5 options (choose tool…, Selenium, Playwright, Cypress, Appium) |
| 45 | Verify the option texts and order | "choose tool…", "Selenium", "Playwright", "Cypress", "Appium" |
| 46 | Select "Playwright" by visible text | "Playwright" should be selected |
| 47 | Verify the "Selected:" text | Text should be `Selected: Playwright` |
| 48 | Select "Appium" by index (index 4) | "Appium" should be selected; the text should update |
| 49 | Select "Selenium", then "Cypress" | Only "Cypress" should be selected at the end |

---

## 6. Additional (Recommended) Test Cases

| S.No | Steps | Expected Result |
|---|---|---|
| 50 | Choose a value in all 4 dropdowns | Each "Selected:" text should show its own value |
| 51 | Change one dropdown only | The other 3 dropdowns should NOT change |
| 52 | Refresh the page after choosing values | All 4 dropdowns should go back to the default state |
| 53 | Focus the standard select and press the Arrow Down key | Next option should be selected (browser behaviour) |
| 54 | Choose the same option two times in the standard select | Option stays selected; no error |
| 55 | Verify the "Selected:" text spelling and case for each choice | Standard/multi-select show lowercase values (`Red` → `red`, `C#` → `csharp`); custom/dynamic show the visible label |

---

## Tips

- **Remember this:** One dropdown = one test group. If a dropdown fails, you know which one.
- In Playwright, `selectOption` works only for real `<select>` elements (standard, multi-select and state select). The custom div dropdown is not a `<select>`. You must click it, then click the option.
- Every element has `data-testid`. The custom options use `custom-option-alpha`, `custom-option-beta` and `custom-option-gamma`.
- For a multi-select, `selectOption` **replaces** the whole selection. Use Ctrl/Cmd + click when the test needs to add or remove one option.
- Standard and multi-select result text shows option **values** (lowercase); the custom and dynamic dropdowns show the visible label.
- The custom dropdown closes only when the toggle is clicked again or an option is selected. It does not close on outside click.

---

# Git and GitHub Flow for This Task

Use the same 12-step flow as before. Only the names change.

**Replace these placeholders:**

- `<number>` = your learning day number
- `<issue>` = the GitHub Issue number

| Item | Name |
|---|---|
| Issue title | Day <number>: Dropdowns practice |
| Branch | feature/day-<number>-dropdowns |
| Folder | tests/day-<number>-dropdowns/ |
| PR title | Day <number>: Dropdowns practice |

> **Golden rule:** Never commit on `main`.

## Start of day

```bash
git switch main
git pull
git switch -c feature/day-<number>-dropdowns
```

Create the Issue on GitHub first (**Issues** tab, then **New issue**). Use the Issue title from the table. Write down the Issue number.

## Files and commits (one small change = one commit)

```text
tests/day-<number>-dropdowns/
  section-4-dropdown-test-cases.md
  standard-select.spec.ts
  multi-select.spec.ts
  custom-dropdown.spec.ts
  state-select.spec.ts
  notes.md
```

```bash
git status
git add tests/day-<number>-dropdowns/section-4-dropdown-test-cases.md
git commit -m "#<issue>: add dropdown test cases"
```

```bash
git add tests/day-<number>-dropdowns/standard-select.spec.ts
git commit -m "#<issue>: add standard select tests"
```

```bash
git add tests/day-<number>-dropdowns/multi-select.spec.ts
git commit -m "#<issue>: add multi-select tests"
```

```bash
git add tests/day-<number>-dropdowns/custom-dropdown.spec.ts
git commit -m "#<issue>: add custom dropdown tests"
```

```bash
git add tests/day-<number>-dropdowns/state-select.spec.ts
git commit -m "#<issue>: add state select tests"
```

```bash
git add tests/day-<number>-dropdowns/notes.md
git commit -m "#<issue>: add notes for dropdowns"
```

## Update, test, push

```bash
git fetch
git pull origin main
npx playwright test
git push -u origin feature/day-<number>-dropdowns
```

## Pull Request

1. Click **Compare & pull request** on GitHub.
2. Title: `Day <number>: Dropdowns practice`
3. Description:

```text
## What I did
- Wrote test cases for 4 dropdowns
- Wrote one Playwright test file for each dropdown

## How to run
npx playwright test tests/day-<number>-dropdowns/

## What I learned
- (write 2 or 3 simple lines)

Closes #<issue>
```

4. Open the **Files changed** tab and check:
   - No `node_modules`, `test-results` or `playwright-report` folders.
   - Clear names and double quotes everywhere.
   - All tests pass, and every test has an `expect`.
5. If all is good: **Merge pull request**, then **Confirm merge**, then **Delete branch**.

## Clean up

```bash
git switch main
git pull
git branch -d feature/day-<number>-dropdowns
```

**Remember this:** Pull `main` first, work on your own branch, test before push, and clean up after merge.
