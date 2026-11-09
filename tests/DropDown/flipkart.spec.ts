import {test, expect} from "@playwright/test";
test.describe("flipkart automation",()=>
{
    test("flipkart autoserch", async({page})=>
    {
        await page.goto("https://www.flipkart.com/");

        // 1. Dismiss the login popup if it shows up (Flipkart can take a few seconds)
        const closeLoginBtn = page.getByRole("button", { name: "✕" });
        const popupVisible = await closeLoginBtn
            .waitFor({ state: "visible", timeout: 10000 })
            .then(() => true)
            .catch(() => false);

        if (popupVisible) {
            // Escape is instant and doesn't depend on Flipkart's flaky click handling
            await page.keyboard.press("Escape").catch(() => {});
            if (await closeLoginBtn.isVisible().catch(() => false)) {
                // dispatchEvent fires the DOM click without waiting for navigation/input signals
                await closeLoginBtn.dispatchEvent("click").catch(() => {});
            }
            await closeLoginBtn.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
        }

        // 2. Type into the search box
        const searchBox = page.getByRole("textbox", { name: /search for products/i });
        await searchBox.click();
        await searchBox.pressSequentially("smartphone", { delay: 150 });

        // 3. Assert suggestions
        const suggestions = page.getByRole("listitem").filter({ hasText: /smartphone/i });
        await expect(suggestions.first()).toBeVisible();

        const sug = await suggestions.allInnerTexts();
        const numberOfSugg = await suggestions.count();
        expect(numberOfSugg).toBeGreaterThan(0);
        console.log("Number of suggestion are", numberOfSugg);
        for (const s of sug)
        {
            console.log(s);
        }
    })
})
