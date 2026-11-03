import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
});

// Helper so you don't repeat the same fill steps
async function fillAllFields(page: Page) {
    await page.getByPlaceholder("Enter your name").fill("Ravi Kumar");
    await page.getByPlaceholder("Enter password").fill("Test@1234");
    await page.getByPlaceholder("Enter email").fill("tester@example.com");
    await page.getByPlaceholder("Enter phone").fill("+91 1234567898");
    await page.getByTestId("textarea-input").fill("line one\nline two");
}

test("1. Page Load Validation", async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Practice Playground/);
});

test("2. Validate Heading Section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Section 1: Basic Form Elements" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Section 3: Checkboxes & Radio Buttons" })).toBeVisible();
});

test("3. Text Box Validation (Section 1)", async ({ page }) => {
    const name = page.getByPlaceholder("Enter your name");
    const pwd = page.getByPlaceholder("Enter password");
    const email = page.getByPlaceholder("Enter email");
    const phone = page.getByPlaceholder("Enter phone");
    const textarea = page.getByTestId("textarea-input");

    await test.step("Text field", async () => {
        await expect(name).toBeVisible();
        await expect(name).toBeEnabled();
        await name.fill("Ravi Kumar");
        await expect(name).toHaveValue("Ravi Kumar");
    });

    await test.step("Password field", async () => {
        await expect(pwd).toBeVisible();
        await expect(pwd).toBeEnabled();
        await pwd.fill("Test@1234");
        await expect(pwd).toHaveValue("Test@1234");
        await expect(pwd).toHaveAttribute("type", "password");
    });

    await test.step("Email field", async () => {
        await expect(email).toBeVisible();
        await expect(email).toBeEnabled();
        await email.fill("tester@example.com");
        await expect(email).toHaveValue("tester@example.com");
    });

    await test.step("Phone field", async () => {
        await expect(phone).toBeVisible();
        await expect(phone).toBeEnabled();
        await phone.pressSequentially("+91 1234567898");
        await expect(phone).toHaveValue("+91 1234567898");
    });

    await test.step("Textarea accepts new lines", async () => {
        const multiLine = "shubham ahire\nmalhar shubham ahire\nradha akash ahire";
        await expect(textarea).toBeVisible();
        await expect(textarea).toBeEnabled();
        await textarea.fill(multiLine);
        await expect(textarea).toHaveValue(multiLine);
    });

   /*  await test.step("Clear text field and check maxlength", async () => {
        await name.clear();
        await expect(name).toHaveValue("");
        await expect(name).toHaveAttribute("maxlength", /\d+/); // use the real value if you know it
    }); */
});

test("4. Submit and Reset Validation", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: "Submit form", exact: true });
    const resetBtn = page.getByRole("button", { name: "Reset form", exact: true });
    const status = page.getByTestId("form-result");

    await expect(status).toHaveText("Not submitted");

    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
    await expect(resetBtn).toBeVisible();
    await expect(resetBtn).toBeEnabled();

    await fillAllFields(page);
    await submitBtn.click();
    await expect(status).toHaveText("Form submitted successfully");

    await resetBtn.click();
    await expect(status).toHaveText("Form was reset"); // confirm this text on the page
    await expect(page.getByPlaceholder("Enter your name")).toHaveValue("");
    await expect(page.getByPlaceholder("Enter password")).toHaveValue("");
    await expect(page.getByPlaceholder("Enter email")).toHaveValue("");
    await expect(page.getByPlaceholder("Enter phone")).toHaveValue("");
    await expect(page.getByTestId("textarea-input")).toHaveValue("");
});
/* ## 4. Radio Button Validation (Section 3)

| S.No | Steps | Expected Result |
|---|---|---|
| 23 | Locate "Choice One" and "Choice Two" radio buttons | Both should be visible & enabled |
| 24 | Verify both radio buttons on page load | Both should NOT be selected |
| 25 | Verify the text below the radio group | Should show "Selected: none" |
| 26 | Select "Choice One" | "Choice One" should be selected |
| 27 | Verify "Choice Two" | "Choice Two" should NOT be selected |
| 28 | Verify the "Selected:" text | Text should show the selected choice (check on page) |
| 29 | Now select "Choice Two" | "Choice Two" selected, "Choice One" NOT selected |
| 30 | Click on "Choice Two" again | It should stay selected (a radio button cannot be unchecked by click) | */
test("5. Radio Button Validation (Section 3)",async({page})=>
{
    const choiceOneRB = page.getByTestId("radio-1");
    const choiceTwoRB = page.getByTestId("radio-2");
    await expect(choiceOneRB).toBeVisible();
    await expect(choiceOneRB).toBeEnabled();
    await expect(choiceTwoRB).toBeVisible();
    await expect(choiceTwoRB).toBeEnabled();
    await expect(choiceOneRB).not.toBeChecked();
    await expect(choiceTwoRB).not.toBeChecked();
    const result = page.getByTestId("radio-result");
    await expect(result).toContainText("none");
    await choiceOneRB.check();
    await expect(choiceTwoRB).not.toBeChecked();
    await expect(result).toContainText("Selected: one");
    await choiceTwoRB.check();
    await expect(result).toContainText("Selected: two");
    await expect(result).not.toContainText("Selected: one");
    await choiceTwoRB.click();
    await expect(result).toContainText("Selected: two");
})
/* ## 5. Checkbox Validation (Section 3)

| S.No | Steps | Expected Result |
|---|---|---|
| 31 | Locate Option A, Option B and Option C checkboxes | All should be visible & enabled |
| 32 | Verify all three checkboxes on page load | All should be unchecked (check on page) |
| 33 | Check Option A | Option A should be checked |
| 34 | Check Option A, B and C | All should be checked |
| 35 | Uncheck Option B | Option B unchecked; A and C still checked |
| 36 | Click "Select All" | All options should be checked |
| 37 | Click "Select All" again | Behaviour should be clear: all unchecked, or no change (check on page) |
| 38 | Check A, B and C one by one | Select All state should update, if implemented (check on page) |
| 39 | Click "Select All", then uncheck Option C | Select All should update, if implemented (check on page) |
| 40 | Check Option A and Option C only (index 1 and 3) | Only these two should be checked |
| 41 | Toggle all checkboxes | Checked → unchecked, unchecked → checked | */
test("6. Checkbox Validation (Section 3)",async({page})=>
{
    const selectAllChk = page.getByTestId("select-all");
    const optionAChk =page.getByRole("checkbox",{name:"Checkbox A"});
    const optionBChk = page.getByRole("checkbox",{name:"Checkbox B"});
    const optionCChk = page.getByRole("checkbox",{name:"Checkbox C"});
    await expect(selectAllChk).toBeVisible();
    await expect(selectAllChk).toBeEnabled();
    await expect(optionAChk).toBeEnabled();
    await expect(optionAChk).toBeEnabled();
    await expect(optionBChk).toBeVisible();
    await expect(optionBChk).toBeEnabled();
    await expect(optionCChk).toBeVisible();
    await expect(optionCChk).toBeEnabled();
    await expect(selectAllChk).not.toBeChecked();
    await expect(optionAChk).not.toBeChecked();
    await expect(optionBChk).not.toBeChecked();
    await expect(optionCChk).not.toBeChecked();
    await optionAChk.check();
     await expect(optionAChk).toBeChecked();
     await optionBChk.check();
     await optionCChk.check();
     await expect(optionAChk).toBeChecked();
     await expect(optionBChk).toBeChecked();
     await expect(optionCChk).toBeChecked();
     await optionBChk.uncheck();
     await expect(optionBChk).not.toBeChecked();
     await optionBChk.check();
     await expect(selectAllChk).toBeChecked();
    await optionCChk.check();
     //await expect(selectAllChk).not.toBeChecked();
     await selectAllChk.check();
     await selectAllChk.uncheck();
    await optionAChk.check();
    await optionCChk.check();
    const chkArray = page.locator(".practice-checkbox");
    const options: Locator[] = [];
    for(let i=0;i<5;i++)
    {
        options.push(chkArray.nth(i));
    }
    for(const option of options)
    {
        if(await option.isChecked)
        {
            await option.uncheck();
        }
        else
        {
            await option.check();
        }
    }

})
/* 6. Hidden Text Checkbox (Section 3)

| S.No | Steps | Expected Result |
|---|---|---|
| 42 | Locate the "Check to reveal hidden text" checkbox | Checkbox should be visible & unchecked |
| 43 | Verify the hidden text on page load | Hidden text should NOT be visible |
| 44 | Check the checkbox | Hidden text should become visible |
| 45 | Uncheck the checkbox | Hidden text should be hidden again | */
test("Hidden Text Checkbox (Section 3)",async({page})=>
{
    const hiddenTxtChk=page.getByTestId("reveal-checkbox");
    await expect(hiddenTxtChk).toBeVisible();
    await expect(hiddenTxtChk).toBeEnabled();
    await expect(hiddenTxtChk).not.toBeChecked();
    const hiddenTxt = page.getByTestId("revealed-text");
    await expect(hiddenTxt).not.toBeVisible();
    await hiddenTxtChk.check();
    await expect(hiddenTxt).toBeVisible();
    await hiddenTxtChk.uncheck();
    await expect(hiddenTxt).not.toBeVisible();

})
