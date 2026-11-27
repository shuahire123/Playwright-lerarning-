import {test, expect, chromium, devices} from "@playwright/test";
import { permission } from "node:process";
test("browser context",async()=>
{
    let browser = await chromium.launch();
    /* {colorScheme:"no-preference", reducedMotion: "reduce", forcedColors: "active", contrast: "more", locale:"fr-FR", 
     viewport:{
        width:0,height:0
    }
    screen:{height:50, width:50},  permissions:["camera"], ignoreHTTPSErrors: true,    
    } */
    let context = await browser.newContext({...devices["iphone 15"]});
    let page = await context.newPage();
   await page.goto("https://www.google.com/");
   await page.waitForTimeout(4000);
})
