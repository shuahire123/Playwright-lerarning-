import {test, expect} from "@playwright/test";
test.skip("browser fixture",async({browser})=>
{
    let context1 = await browser.newContext();
    let context2 = await browser.newContext();
    let page1 = await context1.newPage();
    let page2 = await context1.newPage();
    let page3 = await context2.newPage();
    let page4 = await context2.newPage();
    await page1.goto("https://playwright.dev/");
    await page1.waitForTimeout(4000);
    await page2.goto("https://www.selenium.dev/");
    await page2.waitForTimeout(4000);
     await page3.goto("https://www.appiandev.com/");
     await page3.waitForTimeout(4000);
    await page4.goto("https://www.google.com/");
    await page4.waitForTimeout(4000);
})
test.skip("contextbfixture",async({context})=>
{
    let page1 = await context.newPage();
    let page2 = await context.newPage();
    await page1.goto("https://playwright.dev/");
    await page1.goto("https://www.selenium.dev/");
    await page1.waitForTimeout(4000);

    await page2.goto("https://www.appiandev.com/");
    await page2.goto("https://www.google.com/");
    await page2.waitForTimeout(4000);
})
test("browser name",async({page, browserName})=>
{
    console.log(browserName);
    if(browserName==="chromium")
    {
        await page.goto("https://playwright.dev/");
        console.log("Running test on ",browserName);
    }
    
})

