import {test, expect,Locator} from "@playwright/test";
test("Verify ACAA find ACA consultant",async({page})=>
{
    await page.goto("https://acaa.newpathstudio.com.au/");
    await page.getByRole("button",{name: "MENU"}).click();
    await page.getByRole("link",{name: "Find an ACA consultant"}).click();
   const membershipType: Locator =  page.locator("//select[@id='membership_type']");
   await membershipType.selectOption("Accredited Member");
   const location: Locator = page.locator("//select[@id='consultants_location']");
   await location.selectOption("Victoria");
   await page.locator("[value='Find a Consultant']").click();
   //Verify user on result page
//await expect(page.getByText("Find an ACA Consultant Results")).toHaveValue("Find an ACA Consultant Results");
const consultantPage: string | null=await page.getByRole("heading",{name:"Find an ACA Consultant Results"}).textContent();

 if(consultantPage!==null)
 {
    expect(consultantPage).toContain("Find an ACA Consultant Results");
 }
    const consultantName: Locator = page.locator("div.col-4.results-item h2 a");  
    await expect(consultantName).toHaveText(["Cathryn Grant", "Wendy Turner"]);
    /* await expect(consultantName.first()).toHaveText("Cathryn Grant");   
    await expect(consultantName.last()).toHaveText("Wendy Turner");     */
});