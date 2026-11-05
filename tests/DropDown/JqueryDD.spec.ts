import {test, expect, Locator} from "@playwright/test";
test.describe("dd test",async()=>
{
    test("open site",async({page})=>
    {
        await page.goto("https://www.bstackdemo.com/");
         expect(await page.title()).toBe("StackDemo");
         //order by DD
         const orderByDD = page.locator(".sort select");
         await expect(orderByDD).toBeVisible();
         await expect(orderByDD).toBeEnabled();
        await orderByDD.selectOption({label: "Lowest to highest"});
        // verify all item are sorted in low to high
        /* const prices = await page.locator(".val b").allTextContents();
        const pricesInNumber=prices.map((value)=>Number(value.trim()));
        console.log(prices);
        if(pricesInNumber[0]<=pricesInNumber[pricesInNumber.length-1])
        {
            console.log("all items are in sorted order");
        } */
       /* await expect
    .poll(async () => {
      const texts = await page.locator(".val b").allInnerTexts();
      const prices = texts.map((t) => Number(t));
      return prices.every((p, i) => i === 0 || prices[i - 1] <= p);
    }, { message: "prices should be sorted low to high" })
    .toBe(true); */
    await page.waitForTimeout(2000);
    const prices = await page.locator(".val b").allTextContents()
    const product = await page.locator(".shelf-item__title").allInnerTexts();
    for(let i=0;i<=product.length-1;i++)
    {
        console.log(product[i]," ",prices[i]);
    }
  //lowest price item
  console.log(product[0],' ',prices[0]);
  //higest price product
  console.log(product[product.length-1]," ",prices[prices.length-1]);  

    })
})