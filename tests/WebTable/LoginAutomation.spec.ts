import {test, expect} from "@playwright/test";
test("Verify login", async({page})=>{
    await page.goto("https://courses.ultimateqa.com/users/sign_in");
   let pageTitle: string= await page.title();
   console.log("Page title ",pageTitle);
   await expect(page).toHaveTitle("Sign In - UltimateQA");
    await page.getByRole('textbox', { name: 'Email (required)' }).fill("test@gmail.com");
    await page.getByRole('textbox', { name: 'Email (required)' }).fill("12345678");
    await page.getByRole('button', { name: 'Sign in' }).click();
})