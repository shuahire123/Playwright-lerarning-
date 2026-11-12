import {test, expect} from "@playwright/test";
   /* 1. Page Load Validation
| S.No | Steps | Expected Result |
|---|---|---|
| 1 | Open the URL https://www.sreenidhirajakrishnan.com/practice | Page should load successfully |
| 2 | Scroll to "Section 8: Table Automation" | Section heading should be visible |
| 3 | Verify the section description text | Text about reading rows, sorting, filtering and pagination should be visible |
| 4 | Verify the table, the Sort button, the search box and the pagination controls are visible | All should be visible | */

    test.beforeEach("Page Load Validation",async({page})=>
    {
        await page.goto("https://www.sreenidhirajakrishnan.com/practice");
        await expect(page).
        toHaveTitle("Free Automation Practice Playground: Selenium, Playwright, Cypress, Robot Framework | Sreenidhi Rajakrishnan");
        await expect(page.locator("#section-8 p")).toHaveText("Practise reading rows, sorting by name, filtering with search, and paginating (page size 3).");
        let table = page.getByTestId("practice-table");
        let sortBtn = page.getByTestId("sort-name-btn");
        let searchBox = page.getByTestId("table-search");
        let previousBtn = page.locator("#prev-page-btn");
        let nextBtn = page.locator("#next-page-btn");
        
    })
    
    /*2. Table Structure Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 5 | Locate the table | Table should be visible |
| 6 | Count the column headers | There should be 4 columns |
| 7 | Verify the header texts and order | "Name", "Department", "Role", "Salary" |
| 8 | Count the rows in the table body on page 1 | There should be 3 rows (page size is 3) |
| 9 | Verify that the table has a header row (`thead`) and a body (`tbody`) | Both should be present (check on page) |
| 10 | Verify that every row has 4 cells | Each row should have 4 cells |  */
    test("2. Table Structure Validation",async({page})=>
    {
        let table = page.getByTestId("practice-table");
       await expect(table).toBeVisible();
       const tableHeader = table.locator("thead th");
       await expect(tableHeader).toHaveCount(4);
       await expect(tableHeader).toHaveText(["Name", "Department", "Role", "Salary"]);
        const rows= table.locator("tbody tr");
        await expect(rows).toHaveCount(3);
        await expect(table.locator("thead")).toBeVisible();
        await expect(table.locator("tbody")).toBeVisible();
        await expect(rows.locator("td")).toHaveCount(12);

    })

    /* 3. Table Data Validation (Page 1)

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
| 21 | Verify that the names on the page are not repeated | No duplicate names | */
test("3. Table Data Validation (Page 1)",async({page})=>
{
    const table = page.getByTestId("practice-table");
    const rows = table.locator("tbody tr");

    const expectedRows = [
        ["Anita", "QA", "SDET", "12,00,000"],
        ["Bharath", "Engineering", "Backend", "15,00,000"],
        ["Chitra", "QA", "Lead", "18,00,000"]
    ];

    // #11, #12, #13 - exact values of rows 1, 2, 3
    await expect(rows).toHaveCount(expectedRows.length);
    for(let i = 0; i < expectedRows.length; i++)
    {
        await expect(rows.nth(i).locator("td")).toHaveText(expectedRows[i]);
    }

    // #14 - Name column
    await expect(rows.locator("td:nth-child(1)")).toHaveText(expectedRows.map((row) => row[0]));

    // #15 - Salary column
    await expect(rows.locator("td:nth-child(4)")).toHaveText(expectedRows.map((row) => row[3]));

    // #16 - Bharath's Role
    const bharathRow = rows.filter({
        has: page.getByRole("cell", { name: "Bharath", exact: true })
    });
    await expect(bharathRow).toHaveCount(1);
    await expect(bharathRow.locator("td").nth(2)).toHaveText("Backend");

    // #17 - rows where Department is "QA"
    const qaRows = rows.filter({
        has: page.getByRole("cell", { name: "QA", exact: true })
    });
    await expect(qaRows).toHaveCount(2);
    await expect(qaRows.locator("td:nth-child(1)")).toHaveText(["Anita", "Chitra"]);

    // #18 - row 2, column 3
    await expect(rows.nth(1).locator("td").nth(2)).toHaveText("Backend");

    // #19 - no empty cells
    const allCells = await rows.locator("td").allTextContents();
    expect(allCells).toHaveLength(12);
    for(const [i, text] of allCells.entries())
    {
        expect(text.trim(), `cell ${i + 1} is empty`).not.toBe("");
    }

    // #20 - salary values use the same format
    const salaries = await rows.locator("td:nth-child(4)").allTextContents();
    for(const salary of salaries)
    {
        expect(salary.trim()).toMatch(/^\d{1,2}(,\d{2})*,\d{3}$/);
    }

  // #21 - no duplicate names
  const names = await rows.locator("td:nth-child(1)").allTextContents();
  expect(new Set(names).size).toBe(names.length);
});
/* 4. Sorting Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 22 | Locate the Sort button | Button should be visible & enabled |
| 23 | Verify the button text | Should show "Sort Name (asc)" |
| 24 | Click the Sort button once | Names should be sorted Z to A (the initial table is already A to Z) |
| 25 | Verify the Name column after the sort | Names should be in reverse alphabetical order (Z to A) |
| 26 | Verify the other columns after the sort | Each row should keep its own Department, Role and Salary (the row data must stay together) |
| 27 | Verify the button text after the first click | Should show "Sort Name (desc)" |
| 28 | Click the Sort button a second time | Names should be sorted A to Z |
| 29 | Click the Sort button a third time | Names should be sorted Z to A again |
| 30 | Sort, then go to page 2 | Sort should apply across all pages (desc page 2: Esha, Deepak, Chitra) |
| 31 | Sort, then refresh the page | Table should go back to the first order (page 1, A to Z, button "Sort Name (asc)") | */
test("4. Sorting Validation", async ({ page }) => {
  const table = page.getByTestId("practice-table");
  const sortBtn = page.getByTestId("sort-name-btn");
  const pageIndicator = page.getByTestId("page-indicator");
  const nextBtn = page.getByTestId("next-page-btn");
  const prevBtn = page.getByTestId("prev-page-btn");
  const bodyRows = table.locator("tbody tr");

  // Asserts the exact rows - this also verifies the row data stays together.
  const expectRows = async (expected: string[][]) => {
    await expect(bodyRows).toHaveCount(expected.length);
    for (const [i, row] of expected.entries()) {
      await expect(bodyRows.nth(i).locator("td")).toHaveText(row);
    }
  };

  const ascPage1 = [
    ["Anita", "QA", "SDET", "12,00,000"],
    ["Bharath", "Engineering", "Backend", "15,00,000"],
    ["Chitra", "QA", "Lead", "18,00,000"],
  ];
  const descPage1 = [
    ["Harish", "DevOps", "Platform", "15,50,000"],
    ["Gita", "Product", "PM", "17,00,000"],
    ["Farhan", "QA", "Manual", "9,00,000"],
  ];
  const descPage2 = [
    ["Esha", "Engineering", "Frontend", "14,00,000"],
    ["Deepak", "DevOps", "SRE", "16,00,000"],
    ["Chitra", "QA", "Lead", "18,00,000"],
  ];

  // #22, #23 - button state and default order (the table already starts A to Z)
  await expect(sortBtn).toBeVisible();
  await expect(sortBtn).toBeEnabled();
  await expect(sortBtn).toHaveText("Sort Name (asc)");
  await expectRows(ascPage1);

  // #24, #25, #26, #27 - first click sorts Z to A and keeps rows intact
  await sortBtn.click();
  await expect(sortBtn).toHaveText("Sort Name (desc)");
  await expectRows(descPage1);

  // #30 - go to page 2 while descending: proves the sort applies to all pages
  // (default page 2 is Deepak, Esha, Farhan, so a page-only sort cannot pass this)
  await nextBtn.click();
  await expect(pageIndicator).toHaveText("Page 2 of 3");
  await expectRows(descPage2);

  await prevBtn.click();
  await expect(pageIndicator).toHaveText("Page 1 of 3");

  // #28 - second click sorts back A to Z
  await sortBtn.click();
  await expect(sortBtn).toHaveText("Sort Name (asc)");
  await expectRows(ascPage1);

  // #29 - third click sorts Z to A again
  await sortBtn.click();
  await expect(sortBtn).toHaveText("Sort Name (desc)");
  await expectRows(descPage1);

  // #31 - reload while descending resets the sort and the pagination
  await page.reload();
  await expect(pageIndicator).toHaveText("Page 1 of 3");
  await expect(sortBtn).toHaveText("Sort Name (asc)");
  await expectRows(ascPage1);
});
/* 5. Search (Filter) Validation

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
| 47 | Verify the row count after a search | Rows shown should match the rows that have the search text | */
test("5. Search (Filter) Validation", async ({ page }) => {
  const table = page.getByTestId("practice-table");
  const searchBox = page.getByTestId("table-search");
  const rows = table.locator("tbody tr");
  const nameCells = table.locator("tbody tr td:nth-child(1)");
  const indicator = page.getByTestId("page-indicator");
  const prevBtn = page.locator("#prev-page-btn");
  const nextBtn = page.locator("#next-page-btn");

  // #32, #33 - search box is visible, enabled and empty on load
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();
  await expect(searchBox).toHaveValue("");

  // #34, #35, #36, #37 - exact, case-insensitive and partial name matches
  for (const term of ["Anita", "anita", "ANITA", "Ani"]) {
    await searchBox.fill(term);
    await expect(rows).toHaveCount(1);
    await expect(nameCells).toHaveText(["Anita"]);
  }

  // #45 - search checks all pages: "an" also matches Farhan (page 2)
  await searchBox.fill("an");
  await expect(nameCells).toHaveText(["Anita", "Farhan"]);
  await expect(indicator).toHaveText("Page 1 of 1");

  // #38, #39, #40, #41, #44 - the filter only checks the Name column,
  // so department, role, salary and special characters return no rows.
  for (const term of ["QA", "SDET", "12,00,000", "xyz123", "cyx", "@#$%"]) {
    await searchBox.fill(term);
    await expect(rows).toHaveCount(1);
    await expect(rows).toHaveText("No matching rows");
  }

  // #43 - leading/trailing spaces are not trimmed on this page
  await searchBox.fill(" Anita ");
  await expect(rows).toHaveText("No matching rows");

  // #42 - clearing the search brings all page 1 rows back
  await searchBox.clear();
  await expect(rows).toHaveCount(3);
  await expect(nameCells).toHaveText(["Anita", "Bharath", "Chitra"]);
  await expect(indicator).toHaveText("Page 1 of 3");
  await expect(prevBtn).toBeDisabled();
  await expect(nextBtn).toBeEnabled();

  // #45, #46, #47 - a page-3 name is found; search results fit on one page
  await searchBox.fill("harish");
  await expect(rows).toHaveCount(1);
  await expect(rows.locator("td")).toHaveText([
    "Harish",
    "DevOps",
    "Platform",
    "15,50,000",
  ]);
  await expect(indicator).toHaveText("Page 1 of 1");
  await expect(prevBtn).toBeDisabled();
  await expect(nextBtn).toBeDisabled();
});
/* 6. Pagination Validation

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
| 63 | Click Prev on page 1 or Next on page 3 (if the button is clickable) | Page should not change; no error | */
test("6. Pagination Validation", async ({ page }) => {
  const indicator = page.getByTestId("page-indicator");
  const prevBtn = page.locator("#prev-page-btn");
  const nextBtn = page.locator("#next-page-btn");
  const rows = page.getByTestId("practice-table").locator("tbody tr");

  // #48, #49, #50, #51 - page 1 state
  await expect(indicator).toHaveText("Page 1 of 3");
  await expect(prevBtn).toBeVisible();
  await expect(nextBtn).toBeVisible();
  await expect(prevBtn).toBeDisabled();
  await expect(nextBtn).toBeEnabled();
  const page1 = await rows.allTextContents();

  // #52, #53, #54 - page 2 has 3 different rows; both buttons enabled
  await nextBtn.click();
  await expect(indicator).toHaveText("Page 2 of 3");
  await expect(prevBtn).toBeEnabled();
  await expect(nextBtn).toBeEnabled();
  const page2 = await rows.allTextContents();
  expect(page1).toHaveLength(3);
  expect(page2).toHaveLength(3);
  expect(page2).not.toEqual(page1);

  // #55, #56, #57 - page 3 has only 2 rows and Next is disabled
  await nextBtn.click();
  await expect(indicator).toHaveText("Page 3 of 3");
  const page3 = await rows.allTextContents();
  await expect(nextBtn).toBeDisabled();
  expect(page3).toHaveLength(2);
  expect(page3).not.toEqual(page1);
  expect(page3).not.toEqual(page2);

  // #58, #59 - go back to page 1 with Prev; rows match each page
  await prevBtn.click();
  await expect(indicator).toHaveText("Page 2 of 3");
  await expect(rows).toHaveText(page2);
  await prevBtn.click();
  await expect(indicator).toHaveText("Page 1 of 3");
  await expect(rows).toHaveText(page1);
  await expect(prevBtn).toBeDisabled();

  // #60, #61 - 3 + 3 + 2 = 8 rows, and every row appears only once
  const allRows = [...page1, ...page2, ...page3];
  expect(allRows).toHaveLength(8);
  expect(new Set(allRows).size).toBe(8);

  // #62 - rapid navigation keeps indicator, rows and buttons in sync
  await nextBtn.click();
  await nextBtn.click();
  await prevBtn.click();
  await nextBtn.click();
  await expect(indicator).toHaveText("Page 3 of 3");
  await expect(rows).toHaveText(page3);
  await expect(nextBtn).toBeDisabled();

  // #63 - Prev on page 1 is disabled and cannot change the page
  await prevBtn.click();
  await prevBtn.click();
  await expect(indicator).toHaveText("Page 1 of 3");
  await expect(rows).toHaveText(page1);
  await expect(prevBtn).toBeDisabled();
});

