import {test, expect, Locator} from "@playwright/test";
test.beforeEach("1. Page Load Validation",async({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    let pageTitle = await page.title();
    expect(pageTitle).toContain("Automation Practice Playground");
    //validate heading section
    let section1Heading = await page.getByRole("heading",{name:"Section 1: Basic Form Elements"}).innerText();
    expect(section1Heading).toEqual("Section 1: Basic Form Elements");
    let section3Heading = await page.getByRole("heading",{name:"Section 3: Checkboxes & Radio Buttons"}).textContent();
    expect(section3Heading).toContain("Section 3: Checkboxes & Radio Buttons");

});
/* | 5 | Locate the text input field | Field should be visible & enabled |
| 6 | Enter "Ravi Kumar" in the text field | Value should be entered correctly |
| 7 | Locate the password field | Field should be visible & enabled |
| 8 | Enter "Test@1234" in the password field | Value should match input |
| 9 | Check the `type` attribute of the password field | Type should be "password" (characters are hidden) |
| 10 | Locate the email field | Field should be visible & enabled |
| 11 | Enter "tester@example.com" in the email field | Value should match input |
| 12 | Locate the phone field | Field should be visible & enabled |
| 13 | Enter "+91 1234567898" in the phone field | Value should match input |
| 14 | Locate the textarea | Field should be visible & enabled |
| 15 | Enter a multi-line text (use a new line) | Value should accept the new line |
| 16 | Clear the text field | Field value should be empty |
| 17 | Check the `maxlength` attribute of the text field | Max length value should be shown, if set (check on page) | */
test("2. Text Box Validation (Section 1)",async({page})=>
{
    let name: Locator = page.getByPlaceholder("Enter your name");
    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();
    await name.fill("Ravi Kumar");
    await expect(name).toHaveValue("Ravi Kumar");
    let pwd = page.getByPlaceholder("Enter password");
    await expect(pwd).toBeVisible();
    await expect(pwd).toBeEnabled();
    await pwd.fill("Test@1234");
    await expect(pwd).toHaveValue("Test@1234");
    await expect( pwd).toHaveAttribute("type","password");
    let email = page.getByPlaceholder("Enter email");
    await expect(email).toBeVisible();
    await expect(email).toBeEnabled();
    await email.fill("tester@example.com");
    await expect(email).toHaveValue("tester@example.com");
    let phone = page.getByPlaceholder("Enter phone");
    await expect(phone).toBeVisible();
    await expect(phone).toBeEnabled();
    await phone.pressSequentially("+91 1234567898");
    await expect(phone).toHaveValue("+91 1234567898");
    let text = page.getByTestId("textarea-input");
    await expect(text).toBeVisible();
    await expect(text).toBeEnabled();
    await text.fill("shubham gorkah ahire \n mahlar shubham ahire \n radha akash ahire");
    await text.clear();
    await expect(text).toHaveAttribute("rows","3");
});