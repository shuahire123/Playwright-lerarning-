/* Playwright (Q1 to Q12)
Warm-up (3)

Q1.
(a) What is a locator? Answer in one line.
//locator is use to locate web element 
(b) A locator is “lazy”. What does it mean?
yes locator is lazy becuse it calls when we perform action on element then it is called
(c) What is a strict mode violation? Give one way to fix it.
when we use locator matching with multiple elemnt and use method to perform action that use for sigle element then we get strict mode voilation error then we have to use locator methods like nth(), first(), last()
(d) What does await do? Which word must the function have so that await works?
await is use in asynchronus programing where line are not wait till previous line complte we use await inside async only 
Q2. True or False? Give a short reason for each.
(a) page.$() is the newest and best way to find elements.
page.$() is deprecated so we use page.locator()
(b) A string that starts with // in page.locator() is treated as XPath.
true we // relative for xpath 
(c) getByTestId("x") looks for the data-testid attribute by default.
yes we can chainge the TestId from playwright config file
(d) You should try XPath first and getByRole last.
getByrole first css second xpath 3
(e) npx playwright codegen <url> opens a recorder that writes locators for you.
true

Q3. Write the best built-in locator for each element.
(a) <h1>Welcome back</h1> (use the heading role)
page.getByRole("heading",{name:"Welcome back"});
(b) <p>Your order is placed</p>
page.getByText("Your order is placed");
(c) <button data-testid="save-btn">Save</button>
page.getByRole("button",{name:"Save"});
(d) <input type="checkbox" id="agree"> <label for="agree">I agree</label>
page.getByRole("checkbox",{name:"I agree"});
(e) <input placeholder="Search store">
page.getByPlaceholder("Search store");
(f) A “Login” button. The page also has a “Login with Google” button. Match only the “Login” button.
page.getByText("Login");
Read the code and say what it does (3)

Q4. Page HTML:

html
<label for="email">Email</label> page.getByLabel("Email");  
<input id="email" type="text" placeholder="Enter your email"> page.getByPlaceholder("Enter your email");    
<img src="logo.png" alt="Company logo"> page.getByAltText("Company logo");   
<button type="submit">Sign in</button> page.getByRole("button", { name: "Sign in" }); 
<a href="/help" title="Help centre">Help</a> page.getByTitle("Help centre");       page.getByRole("link", { name: "Help" });


Q5. Page HTML:

html
<ul id="menu">
  <li>Home</li>
  <li>Products</li>
  <li>Contact</li>
</ul>

Code:

ts
const items = page.locator("#menu li");
console.log(await items.count());                // (a)  3
console.log(await items.first().textContent());  // (b)  Home
console.log(await items.nth(1).textContent());   // (c) Products
console.log(await items.last().textContent());   // (d) Contact
console.log(await items.allTextContents());      // (e) ["Home","Products","Contact"]

(a) to (e): What does each line print?
(f) What happens if you write await items.click();? Why? strict  voliation error becuse we are claiing click on multiple mactching locator
(g) What does await items.all() return 3? What is its length?  dont know explain

Q6.
const row = page.locator("tr").filter({ hasText: "Conway" });
await row.getByRole("link", { name: "delete" }).click();
first get elemet with tr tag name then it will check the tr with text Conway after that it will check link with name delete and click that link
(a) Explain these two lines in simple words.

The page has these texts: “Login”, “Login with Google”, “login help”.

ts
page.getByText("Login");                  // line 1 wiill match locator with login text without case 
page.getByText("Login", { exact: true }); // line 2 wiill match locator with login text with case 
page.getByText(/login/i);                 // line 3  wiill match locator with login text without case

(b) Which texts does each of the 3 lines match?
(c) What is the difference between .filter({ hasText: "x" }) and .filter({ has: locator })?
hasText check for matching text and has filter based on locator of elements

Coding exercises (4)

Q7. Write a full test called "login test" for https://the-internet.herokuapp.com/login.

Go to the page.
Fill the username with tomsmith. Use getByLabel.
Fill the password with SuperSecretPassword!. Use getByLabel.
Click the Login button. Use getByRole.
Print the text of the message that has the id flash. Use a CSS locator.
test("login test",async({page})=>{
await page.goto("https://the-internet.herokuapp.com/login");
await page.getByLabel("username").fill("tomsmith");
await page.getByRole("button",{name:"Login button"});
console.log(await page.locator("#flash").textContent());
});

Q8. Use this HTML for Q8 and Q9:

html
<div id="shop" class="container main">
  <h2 class="title">Today Offers</h2>
  <ul class="product-list">
    <li class="item"><a href="/backpack" title="Backpack">Backpack</a><span class="price">$30</span></li>
    <li class="item"><a href="/bike-light" title="Bike Light">Bike Light</a><span class="price">$10</span></li>
    <li class="item sale"><a href="/onesie" title="Onesie">Onesie</a><span class="price">$8</span></li>
  </ul>
  <input type="text" name="coupon" id="coupon-code" placeholder="Enter coupon">
  <button type="submit" class="btn btn-primary">Apply</button>
</div>

Write page.locator(...) with a CSS selector for each:
(a) the div by its id
page.locator("#shop");
(b) the h2 by its class, with the tag name
page.locator(".title");
(c) the input by its name attribute
page.locator("[name ='coupon']");
(d) the button that has both classes btn and btn-primary
page.locator(".btn.btn-primary");
(e) all a tags whose href starts with /b
page.locator("[href^='b']");
(f) the li that has both classes item and sale
page.locator(".item.sale");
html
<div id="shop" class="container main">
  <h2 class="title">Today Offers</h2>
  <ul class="product-list">
    <li class="item"><a href="/backpack" title="Backpack">Backpack</a><span class="price">$30</span></li>
    <li class="item"><a href="/bike-light" title="Bike Light">Bike Light</a><span class="price">$10</span></li>
    <li class="item sale"><a href="/onesie" title="Onesie">Onesie</a><span class="price">$8</span></li>
  </ul>
  <input type="text" name="coupon" id="coupon-code" placeholder="Enter coupon">
  <button type="submit" class="btn btn-primary">Apply</button>
</div>
Q9. Use the same HTML as Q8. Write page.locator(...) with an XPath for each:
(a) the input with the name attribute coupon
page.locator("//input[@name='coupon']");
(b) the a tag with the exact text Onesie
page.locator("//a[text()='Onesie']");
(c) the a tag whose title contains Bike
page.locator("//a[conatins(@title,'Bike')]");
(d) the a tag whose href starts with /b
page.locator("//a[starts-with(@href,'/b')]");
(e) the second li
page.locator("//li[2]")
(f) the price span that comes next to the a with the text Backpack
page.locator("//a[@title='Backpack']/span")

Q10. Page: https://the-internet.herokuapp.com/tables. Look at the second table (id table2). 
Its cells have these classes: last-name, first-name, email and dues.
 Write code inside a test (with async and await) to do the following.
(a) Go to the page. Print how many rows #table2 tbody tr has.
(b) Save all last names (#table2 tbody .last-name) in a variable with the type string[]. Print each one with for...of.
(c) Print the dues of the row that contains the text “Bach”. Use filter and chaining.
(d) Print the email of the last row. Use .last().
test("test1",async({page})=>{
await page.goto("https://the-internet.herokuapp.com/tables");
console.log("total number of rows",await page.locator("#table2 tr").count());
const lastNames: string[] = await page.locator("#table2  tbody tr .last-name").allTextContents();
for(const lastName of lastNames)
{
    console.log(lastName);
}
let due:string = await page.locator("#table2  tbody tr").filter(hasText :"Bach").filter(has: ".dues").textContent();
console.log(due);
const lastEmail: string= page.loctor("#table2  tbody tr").last().filter(has: "page.locator(.email)").textContent();
console.log(lastEmail);
});

Find the bug (2)

Q11. Find all the bugs. Write the fixed code. Also say which line was already correct.

ts
import { test } from "@playwright/test";

test("open login", ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  const username = page.getByLabel("Username");
  await username.fill("tomsmith");
});

Q12. This code is on the login page, which has 2 inputs. Find the 3 bugs and fix them.

ts
await page.locator("//input").fill("tomsmith");              // line 1
await page.locator("//input[@id='password']").fill("pass");  // line 2
await page.getByRole("button", {name: "Login"}).click();           // line 3
TypeScript (Q13 to Q20)
Warm-up (2)

Q13.
(a) Fill in what each method returns: 
forEach use for do some action then print not return anything ,
 map do sum action retrun same legth array, 
 filter return same or diffleght array when perticular condition is match tose item add in array, 
 find check the item is in the array or not return boolean, 
 some check item is present in array or not return boolean true if at least one pass else false, 
 every if all item are pass then true else false ,
  reduce do the option and return one item , 
  includes check the item prsnt in array and rturn boolan , 
  join join all item from array and create one item .
(b) You need await inside a loop. Which one do you use: forEach or for...of?
for of
Q14. Rewrite each line with the correct type annotation.

ts
const linkTexts: string[] = await page.locator("a").allTextContents();            // (a)
const total: number = await page.locator("a").count();                          // (b)
const firstA: boolean = linkTexts.find((t) => t.startsWith("A"));                // (c)
Predict the output (2)

Q15.

ts
const texts: string[] = ["  Backpack ", "Bike Light", " Onesie  "];
const clean: string[] = texts.map((t) => t.trim());
console.log(clean);  ["Backpack","Bike Light","Onesie"]                                // (a)
console.log(clean.length);    3                        // (b)
console.log(clean.filter((t) => t.includes("B"))); ["Backpack","Bike Light"]   // (c)
console.log(clean.join(" | ")); "Backpack | Bike Light | Onesie"                      // (d)

Q16.

ts
const prices: number[] = [30, 10, 16, 50];
console.log(prices.some((p) => p > 40));  true      // (a)
console.log(prices.every((p) => p > 10));    false  // (b)
console.log(prices.find((p) => p < 12));   10    // (c)
console.log(prices.find((p) => p > 100)); undefine     // (d)
console.log(prices.reduce((sum, p) => sum + p, 0)); 106 // (e)
console.log(prices.indexOf(16));  2             // (f)
Coding exercises (3)

Q17. You have:

ts
const products: string[] = ["Backpack", "Bike Light", "Onesie", "Fleece Jacket"];

(a) Make a new array with all names in UPPER CASE. Use map.
const productsUpper: string[] = products.map((product)=>product.toUpperCase());
(b) Make a new array with names that have more than 6 letters. Use filter.
const bigProducts: string[] = products.filter((product)=>product.length() > 6);
(c) Find the first name that starts with "F". Use find. Write the correct type for the result.
const firstName: string = products.find((product)=>product.startWith("F"));

Q18. Write a function cleanTexts with a parameter type and a return type.

Input: an array of strings.
Output: an array of strings.
It trims every text, then removes the empty texts.

Then call it with [" Home ", "", " About ", " "] and print the result.
function cleanTexts(Input: string[]): string[]
{
    return Input.filter((value)=>{value.trim().length > 0});
}
console.log(cleanTexts([" Home ", "", " About ", " "]));
Q19. You have:

ts
const priceTexts: string[] = ["$30", "$10", "$16"];

(a) Make a number[] with the numbers only. Use map, replace and Number.
let price: number[]=priceTexts.map((num)=>{Number(num.replace("$",""))});
(b) Find the total. Use reduce with a start value.
let total:number = price.reduce((sum,num)=>sum+=num,0);
(c) Make an array of prices that are more than 12. Use filter.
let highPrice: number[] = price.filter((num)=>{num > 12});

Revision from an older TypeScript topic (1)

Q20. (Topic: Record, Object.entries, destructuring)
(a) Make a Record<string, string> called locators with these
 entries: username → "#user-name", password → "#password", loginButton → "#login-button".
let locators: Record<string, string> ={username : "#user-name", password : "#password", loginButton : "#login-button"};
(b) Loop over it with for...of and Object.entries. Use destructuring 
for [name, selector]. Print name -> selector with a template string.

for (let [name, selector] of Object.entries(locators))
{
    console.log(`${name} -> ${selector}`);
}
(c) Use destructuring to take username and password out of locators into two variables.
let {name, selector} = locators;



*/