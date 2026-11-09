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
})
