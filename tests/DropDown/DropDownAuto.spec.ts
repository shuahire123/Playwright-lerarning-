import { test, expect, Locator } from "@playwright/test";
test.describe("Automation Practice Playground", () => {
  test.beforeEach("Open site", async ({ page }) => {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    expect(await page).toHaveTitle(
      "Free Automation Practice Playground: Selenium, Playwright, Cypress, Robot Framework | Sreenidhi Rajakrishnan",
    );
  });
  /* ## 1. Page Load Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 1 | Open the URL https://www.sreenidhirajakrishnan.com/practice | Page should load successfully |
| 2 | Scroll to "Section 4: Dropdowns" | Section heading should be visible |
| 3 | Verify the section description text | 
    Text about standard select, multi-select, custom div dropdown and state select should be visible |
| 4 | Verify all 4 dropdowns are visible in Section 4 | Standard, multi-select, custom div and state select should all be visible | */
  test("1. Page Load Validation", async ({ page }) => {
    const section4 = page.locator("#section-4").first();
    const sectionHeading = section4.getByRole("heading", {
      name: "Section 4: Dropdowns",
    });
    expect(await sectionHeading.innerText()).toBe("Section 4: Dropdowns");
    await expect(sectionHeading).toBeVisible();
    await expect(section4.locator(".mt-1.text-sm.text-muted")).toHaveText(
      "Practise standard select, multi-select, a custom div-based dropdown, and a select populated from state.",
    );
    await expect(page.locator("#standard-select")).toBeVisible();
    await expect(page.locator("#multi-select")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-toggle")).toBeVisible();
    await expect(page.locator("#dynamic-select")).toBeVisible();
  });
  /* ## 2. Standard Select Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 5 | Locate the standard select | Dropdown should be visible & enabled |
| 6 | Verify the default selected option | "choose…" should be shown |
| 7 | Verify the text below the dropdown on page load | Should show "Selected: none" |
| 8 | Count all options | There should be 4 options (choose…, Red, Green, Blue) |
| 9 | Verify the option texts | "choose…", "Red", "Green", "Blue" |
| 10 | Select "Red" by visible text | "Red" should be selected |
| 11 | Verify the "Selected:" text | Text should show the Red choice (check on page) |
| 12 | Select "Green" by value | "Green" should be selected (check the `value` on page) |
| 13 | Select "Blue" by index (index 3) | "Blue" should be selected |
| 14 | Change the selection from "Red" to "Blue" | Only "Blue" should be selected; the text should update |
| 15 | Select "choose…" again | Dropdown shows "choose…"; check if text goes back to "Selected: none" (check on page) |
| 16 | Check that the select does not have the `multiple` attribute | Only one option can be selected at a time | */
  test("2. Standard Select Validation", async ({ page }) => {
    const ss = page.locator("#standard-select");
    await expect(ss).toBeVisible();
    await expect(ss).toBeEnabled();
    await expect(ss.locator("option:checked")).toHaveText("choose…");
    let textBelowDD = page.getByTestId("standard-select-result");
    await expect(textBelowDD).toHaveText("Selected: none");
    const allOptions = await ss.locator("option").allTextContents();
    console.log("All options in DD : ", allOptions);
    expect(allOptions.length).toBe(4);
    expect(allOptions).toEqual(["choose…", "Red", "Green", "Blue"]);
    await ss.selectOption({ label: "Red" });
    await expect(textBelowDD).toHaveText("Selected: red");
    await ss.selectOption({ value: "green" });
    await expect(textBelowDD).toHaveText("Selected: green");
    await expect(ss).toHaveValue("green");
    await ss.selectOption({index: 3});
    await expect(textBelowDD).toHaveText("Selected: blue");
    await ss.selectOption({label:"choose…"});
    await expect(textBelowDD).toHaveText("Selected: none");
    await expect(ss).not.toHaveAttribute("multiple");
  });
  /* 3. Multi-Select Validation

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
| 25 | Select "Java", "JavaScript" and "C#" | 
These 3 should be selected; "Python" should NOT be selected |
| 26 | Select all 4 options | All 4 should be selected |
| 27 | Deselect "Python" (Ctrl/Cmd + click) | 
"Python" unselected; the other 3 stay selected |
| 28 | Click "C#" without Ctrl/Cmd | Only "C#" should be selected;
 all others unselected |
| 29 | Verify the "Selected:" text after choosing 2 or more options |
 should show all chosen values (check the format on page) | */
 test.only("3. Multi-Select Validation",async({page})=>
{
    const multiSelectDD = page.locator("#multi-select");
    await expect(multiSelectDD).toHaveAttribute("multiple");
     expect(await multiSelectDD.locator("option").count()).toEqual(4);
     console.log(await multiSelectDD.locator("option").allTextContents());
     expect(await multiSelectDD.locator("option").allTextContents()).toEqual(["Java", "Python", "JavaScript", "C#"]);
    expect(await multiSelectDD.locator("option:checked").count()).toEqual(0);
    let textBelowDD = page.getByTestId("multi-select-result"); 
    await expect(textBelowDD).toHaveText("Selected: none");  
    await multiSelectDD.selectOption({label:"Java"});  
    await expect(textBelowDD).toHaveText("Selected: java");
    await multiSelectDD.selectOption(["Java","Python"]);
    await expect(textBelowDD).toHaveText("Selected: java, python");
    await multiSelectDD.selectOption([{label:"Java"}, {label:"Python"},{label:"C#"}]);
     expect( await multiSelectDD.locator("option:checked").allTextContents()).toEqual(["Java", "Python", "C#"]);
     await expect( multiSelectDD.locator("option:checked",{hasText: "Python"})).not.toHaveCount(0);
     multiSelectDD.selectOption(["Java", "Python", "JavaScript", "C#"]);
     await expect(textBelowDD).toHaveText("Selected: java, python, javascript, csharp");
     await multiSelectDD.locator("option",{hasText:"Python"}).click({modifiers:["ControlOrMeta"]});
    await multiSelectDD.selectOption("csharp");
    await expect( multiSelectDD).toHaveValues(["csharp"]);
    await multiSelectDD.selectOption([{label:"C#"},{label:"Java"}]);
    await expect(textBelowDD).toHaveText("Selected: java, csharp");
})
});
