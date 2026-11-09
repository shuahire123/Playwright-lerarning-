# Test Cases: Section 8 Table Automation (Web Table)

**Application Used:** Automation Practice Playground
**URL:** https://www.sreenidhirajakrishnan.com/practice
**Section covered:** Section 8: Table Automation

**What the section says:** Practise reading rows, sorting by name, filtering with search, and paginating (page size 3).

**What is visible on page load (page 1):**

| Name | Department | Role | Salary |
|---|---|---|---|
| Anita | QA | SDET | 12,00,000 |
| Bharath | Engineering | Backend | 15,00,000 |
| Chitra | QA | Lead | 18,00,000 |

Other controls: a **Sort Name (asc)** button, a search box, **Prev** and **Next** buttons, and the text **"Page 1 of 3"**.

> **Note:** These test cases are based on the page text only. I could not see the HTML. The data on page 2 and page 3, the search box placeholder, and what happens on each click are not known. Where the result depends on the real page, it is marked **(check on page)**. Open DevTools (F12) and check first. Write down the data of all 3 pages before you start.

---

## 1. Page Load Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 1 | Open the URL https://www.sreenidhirajakrishnan.com/practice | Page should load successfully |
| 2 | Scroll to "Section 8: Table Automation" | Section heading should be visible |
| 3 | Verify the section description text | Text about reading rows, sorting, filtering and pagination should be visible |
| 4 | Verify the table, the Sort button, the search box and the pagination controls are visible | All should be visible |

---

## 2. Table Structure Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 5 | Locate the table | Table should be visible |
| 6 | Count the column headers | There should be 4 columns |
| 7 | Verify the header texts and order | "Name", "Department", "Role", "Salary" |
| 8 | Count the rows in the table body on page 1 | There should be 3 rows (page size is 3) |
| 9 | Verify that the table has a header row (`thead`) and a body (`tbody`) | Both should be present (check on page) |
| 10 | Verify that every row has 4 cells | Each row should have 4 cells |

---

## 3. Table Data Validation (Page 1)

| S.No | Steps | Expected Result |
|---|---|---|
| 11 | Read row 1 | "Anita", "QA", "SDET", "12,00,000" |
| 12 | Read row 2 | "Bharath", "Engineering", "Backend", "15,00,000" |
| 13 | Read row 3 | "Chitra", "QA", "Lead", "18,00,000" |
| 14 | Read all values of the "Name" column | "Anita", "Bharath", "Chitra" |
| 15 | Read all values of the "Salary" column | "12,00,000", "15,00,000", "18,00,000" |
| 16 | Find the row that has name "Bharath" and read its Role | Role should be "Backend" |
| 17 | Find all rows where Department is "QA" | 2 rows: "Anita" and "Chitra" |
| 18 | Read the cell at row 2, column 3 | "Backend" |
| 19 | Verify that no cell is empty | All cells should have text |
| 20 | Verify that the Salary values use the same format (digits with commas) | All values should follow the same format |
| 21 | Verify that the names on the page are not repeated | No duplicate names |

---

## 4. Sorting Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 22 | Locate the Sort button | Button should be visible & enabled |
| 23 | Verify the button text | Should show "Sort Name (asc)" |
| 24 | Click the Sort button once | Names should be sorted A to Z |
| 25 | Verify the Name column after the sort | Names should be in alphabetical order (A to Z) |
| 26 | Verify the other columns after the sort | Each row should keep its own Department, Role and Salary (the row data must stay together) |
| 27 | Verify the button text after the first click | Text may change, for example to "desc" (check on page) |
| 28 | Click the Sort button a second time | Names should be sorted Z to A, if toggle is implemented (check on page) |
| 29 | Click the Sort button a third time | Order should change again, or stay the same (check on page) |
| 30 | Sort, then go to page 2 | Check if the sort applies to all pages or only to one page (check on page) |
| 31 | Sort, then refresh the page | Table should go back to the first order |

---

## 5. Search (Filter) Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 32 | Locate the search box | Box should be visible & enabled |
| 33 | Verify the search box is empty on page load | Value should be empty |
| 34 | Enter "Anita" in the search box | Only the row "Anita" should be shown |
| 35 | Enter "anita" (small letters) | Same row should be shown, if search is not case-sensitive (check on page) |
| 36 | Enter "ANITA" (capital letters) | Same row should be shown, if search is not case-sensitive (check on page) |
| 37 | Enter "Ani" (part of a name) | Row "Anita" should be shown |
| 38 | Enter "QA" (a department) | Rows with "QA" should be shown, if search checks all columns (check on page) |
| 39 | Enter "SDET" (a role) | Row with role "SDET" should be shown, if search checks all columns (check on page) |
| 40 | Enter "12,00,000" (a salary) | Matching row should be shown, if search checks the Salary column (check on page) |
| 41 | Enter a text with no match, like "xyz123" | No rows should be shown; a "No data" message may appear (check on page) |
| 42 | Clear the search box after a search | All rows should come back |
| 43 | Enter text with spaces at the start and end, like " Anita " | Result should be clear: either match or no match (check on page) |
| 44 | Enter special characters "@#$%" | No rows shown; no error on the page |
| 45 | Search with a name from page 2 or page 3 | Row should be shown, if search checks all pages (check on page) |
| 46 | Verify the pagination text after a search | "Page x of y" should update to match the result (check on page) |
| 47 | Verify the row count after a search | Rows shown should match the rows that have the search text |

---

## 6. Pagination Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 48 | Verify the pagination text on page load | Should show "Page 1 of 3" |
| 49 | Locate the Prev and Next buttons | Both should be visible |
| 50 | Verify the Prev button on page 1 | Prev should be disabled |
| 51 | Verify the Next button on page 1 | Next should be enabled |
| 52 | Click Next | Text should show "Page 2 of 3" |
| 53 | Verify the rows on page 2 | There should be 3 rows, and they should be different from page 1 |
| 54 | Verify the Prev button on page 2 | Prev should be enabled |
| 55 | Click Next again | Text should show "Page 3 of 3" |
| 56 | Verify the rows on page 3 | Rows should be different from page 1 and page 2 |
| 57 | Verify the Next button on page 3 | Next should be disabled |
| 58 | Click Prev from page 3 | Text should show "Page 2 of 3", and the page 2 rows should be shown again |
| 59 | Click Prev until page 1 | Text should show "Page 1 of 3"; Prev should be disabled |
| 60 | Read the data of all 3 pages and count the rows | Total rows should be 9 (3 rows x 3 pages), if every page has 3 rows (check on page) |
| 61 | Verify that no row is repeated across pages | Every row should appear only once |
| 62 | Click Next and Prev quickly many times | Page text and rows should always match each other |
| 63 | Click Prev on page 1 or Next on page 3 (if the button is clickable) | Page should not change; no error |

---

## 7. Combined (Sort, Search and Pagination) Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 64 | Go to page 2, then click Sort | Check which page is shown after the sort (check on page) |
| 65 | Go to page 2, then search for "QA" | Page should reset to page 1 of the new result (check on page) |
| 66 | Search for "QA", then click Sort | Only the "QA" rows should be sorted |
| 67 | Search for "QA", then click Next | Only filtered rows should be shown on each page |
| 68 | Search, then clear the search box | Table should return to the full data and "Page 1 of 3" (check on page) |
| 69 | Sort, then search, then clear the search | Sorted order should stay, or reset (check on page) |

---

## 8. Additional (Recommended) Test Cases

| S.No | Steps | Expected Result |
|---|---|---|
| 70 | Refresh the page after sorting, searching and going to page 2 | Table should go back to the default state (page 1, no search, no sort) |
| 71 | Verify the highest salary in the full data | Value should be found by reading all 3 pages |
| 72 | Verify the lowest salary in the full data | Value should be found by reading all 3 pages |
| 73 | Verify the salary column text is right-aligned or left-aligned in the same way for all rows | Alignment should be the same for all rows (visual check) |
| 74 | Resize the browser window to a small width | Table should still be readable, or scroll sideways |
| 75 | Verify the table text spelling and case for all rows | No typo; same case style in the column |

---

## Tips

- **Remember this:** Read the data of all pages first. Without the real data, you cannot write a correct expected result.
- A web table has rows (`tr`), header cells (`th`) and data cells (`td`). Think of the table as a grid: row number and column number.
- Write one test for each part: structure, data, sorting, search and pagination. If one fails, you know where to look.
- For sorting, do not only check the Name column. Check that the whole row moves together.
- Every element has `data-testid`. Check the real values in DevTools before you use `getByTestId`.

---

# Git and GitHub Flow for This Task

Use the same 12-step flow as before. Only the names change.

**Replace these placeholders:**

- `<number>` = your learning day number
- `<issue>` = the GitHub Issue number

| Item | Name |
|---|---|
| Issue title | Day <number>: Table automation practice |
| Branch | feature/day-<number>-table-automation |
| Folder | tests/day-<number>-table-automation/ |
| PR title | Day <number>: Table automation practice |

> **Golden rule:** Never commit on `main`.

## Start of day

```bash
git switch main
git pull
git switch -c feature/day-<number>-table-automation
```

Create the Issue on GitHub first (**Issues** tab, then **New issue**). Use the Issue title from the table. Write down the Issue number.

## Files and commits (one small change = one commit)

```text
tests/day-<number>-table-automation/
  section-8-table-test-cases.md
  table-structure.spec.ts
  table-data.spec.ts
  table-sort.spec.ts
  table-search.spec.ts
  table-pagination.spec.ts
  notes.md
```

```bash
git status
git add tests/day-<number>-table-automation/section-8-table-test-cases.md
git commit -m "#<issue>: add table test cases"
```

```bash
git add tests/day-<number>-table-automation/table-structure.spec.ts
git commit -m "#<issue>: add table structure tests"
```

```bash
git add tests/day-<number>-table-automation/table-data.spec.ts
git commit -m "#<issue>: add table data tests"
```

```bash
git add tests/day-<number>-table-automation/table-sort.spec.ts
git commit -m "#<issue>: add table sort tests"
```

```bash
git add tests/day-<number>-table-automation/table-search.spec.ts
git commit -m "#<issue>: add table search tests"
```

```bash
git add tests/day-<number>-table-automation/table-pagination.spec.ts
git commit -m "#<issue>: add table pagination tests"
```

```bash
git add tests/day-<number>-table-automation/notes.md
git commit -m "#<issue>: add notes for table automation"
```

## Update, test, push

```bash
git fetch
git pull origin main
npx playwright test
git push -u origin feature/day-<number>-table-automation
```

## Pull Request

1. Click **Compare & pull request** on GitHub.
2. Title: `Day <number>: Table automation practice`
3. Description:

```text
## What I did
- Wrote test cases for the web table (structure, data, sort, search, pagination)
- Wrote Playwright tests for each part

## How to run
npx playwright test tests/day-<number>-table-automation/

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
git branch -d feature/day-<number>-table-automation
```

**Remember this:** Pull `main` first, work on your own branch, test before push, and clean up after merge.
