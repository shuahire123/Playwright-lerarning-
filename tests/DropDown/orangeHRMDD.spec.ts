import { test, expect } from "@playwright/test";

test("Orange HRM DD validations", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    // Click on PIM link
    await page.getByRole("link", { name: "PIM" }).click();

    // Open the Job Title dropdown (scoped by label, not index)
    const jobTitleGroup = page.locator(".oxd-input-group").filter({
        has: page.locator(".oxd-label", { hasText: "Job Title" }),
    });
    await jobTitleGroup.locator(".oxd-select-text").click();

    // Wait for the asynchronously loaded option, then click it
    const jobTitleOption = page.getByRole("option", {
        name: "Automaton Tester",
        exact: true,
    });
    await expect(jobTitleOption).toBeVisible();

    // The real list is loaded now, so it is safe to read and print it
    const options = await page.getByRole("option").allTextContents();
    console.log("Number of options in Job Title:", options.length);
    for (const option of options) {
        console.log(option);
    }

    await jobTitleOption.click();

    await expect(jobTitleGroup.locator(".oxd-select-text-input")).toHaveText(
        "Automaton Tester",
    );
});
