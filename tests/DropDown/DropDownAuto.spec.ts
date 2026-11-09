import { test, expect } from "@playwright/test";

/**
 * Section 4: Dropdowns
 *
 * The full test-case tables live in `section-4-dropdown-test-cases.md`.
 * Test names and `test.step` titles reference the TC numbers from that file.
 *
 * Test data verified on the live page:
 * - Standard select result shows the lowercase VALUE: Red -> "Selected: red".
 * - Multi-select result shows values in option/DOM order: Java + C# -> "java, csharp".
 * - Custom dropdown shows the selected LABEL: Alpha -> "Selected: Alpha".
 * - Dynamic select uses labels as values: Playwright -> "Selected: Playwright".
 */
test.describe("Automation Practice Playground - Section 4: Dropdowns", () => {
  test.beforeEach("Open the practice page", async ({ page }) => {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");

    // Web-first assertion: Playwright retries until the title matches.
    // A regex is less brittle than the full marketing title.
    await expect(page).toHaveTitle(/Automation Practice Playground/);
  });

  /**
   * Test case group 1: Page load validation (TC 1-4).
   */
  test("1. Page Load Validation", async ({ page }) => {
    const section4 = page.locator("#section-4");

    await test.step("TC 2: Scroll to the section and check the heading", async () => {
      await section4.scrollIntoViewIfNeeded();
      await expect(section4).toBeInViewport();
      await expect(
        section4.getByRole("heading", { name: "Section 4: Dropdowns" }),
      ).toBeVisible();
    });

    await test.step("TC 3: Section description mentions all four dropdown types", async () => {
      // Check key phrases instead of the full static copy. This is less
      // brittle when the marketing text changes.
      // Note: toContainText(array) is for multiple elements, so use one
      // assertion per phrase for a single section element.
      await expect(section4).toContainText("Practise standard select");
      await expect(section4).toContainText("multi-select");
      await expect(section4).toContainText("custom div-based dropdown");
      await expect(section4).toContainText("select populated from state");
    });

    await test.step("TC 4: All four dropdowns are visible", async () => {
      // Scope the checks to Section 4 so a random element elsewhere on the
      // page can never satisfy the assertion.
      await expect(section4.getByTestId("standard-select")).toBeVisible();
      await expect(section4.getByTestId("multi-select")).toBeVisible();
      await expect(
        section4.getByTestId("custom-dropdown-toggle"),
      ).toBeVisible();
      await expect(section4.getByTestId("dynamic-select")).toBeVisible();
    });
  });

  /**
   * Test case group 2: Standard select (TC 5-16).
   */
  test("2. Standard Select Validation", async ({ page }) => {
    const standardSelect = page.getByTestId("standard-select");
    const result = page.getByTestId("standard-select-result");

    await test.step("TC 5-6: Visible, enabled and default option", async () => {
      await expect(standardSelect).toBeVisible();
      await expect(standardSelect).toBeEnabled();

      // The placeholder option has value="" and is selected on load.
      await expect(standardSelect).toHaveValue("");
      await expect(standardSelect.locator("option:checked")).toHaveText(
        "choose…",
      );
    });

    await test.step("TC 7: Default result text", async () => {
      await expect(result).toHaveText("Selected: none");
    });

    await test.step("TC 8-9: Four options in the expected order", async () => {
      // toHaveText on multiple elements checks count, order and text.
      await expect(standardSelect.locator("option")).toHaveText([
        "choose…",
        "Red",
        "Green",
        "Blue",
      ]);
    });

    await test.step("TC 10-11: Select Red by visible text", async () => {
      await standardSelect.selectOption({ label: "Red" });
      await expect(standardSelect).toHaveValue("red");

      // Expected behaviour from the page: the result shows the lowercase
      // option value, not the visible label "Red".
      await expect(result).toHaveText("Selected: red");
    });

    await test.step("TC 12: Select Green by value", async () => {
      await standardSelect.selectOption({ value: "green" });
      await expect(standardSelect).toHaveValue("green");
      await expect(result).toHaveText("Selected: green");
    });

    await test.step("TC 13: Select Blue by index", async () => {
      await standardSelect.selectOption({ index: 3 });
      await expect(standardSelect).toHaveValue("blue");
      await expect(result).toHaveText("Selected: blue");
    });

    await test.step("TC 14: Change the selection from Red to Blue", async () => {
      await standardSelect.selectOption({ label: "Red" });
      await standardSelect.selectOption({ label: "Blue" });
      await expect(standardSelect).toHaveValue("blue");
      await expect(result).toHaveText("Selected: blue");
    });

    await test.step("TC 15: Select the placeholder again", async () => {
      await standardSelect.selectOption({ label: "choose…" });
      await expect(standardSelect).toHaveValue("");
      await expect(result).toHaveText("Selected: none");
    });

    await test.step("TC 16: Only one option can be selected", async () => {
      await expect(standardSelect).not.toHaveAttribute("multiple");
    });
  });

  /**
   * Test case group 3: Multi-select (TC 17-29).
   *
   * Note: selectOption() REPLACES the whole selection on a multi-select.
   * Where the test case describes Ctrl/Cmd + click, the test clicks the
   * option with ControlOrMeta so the real UI interaction is covered.
   */
  test("3. Multi-Select Validation", async ({ page }) => {
    const multiSelect = page.getByTestId("multi-select");
    const result = page.getByTestId("multi-select-result");

    await test.step("TC 17-18: Visible, enabled and multiple", async () => {
      await expect(multiSelect).toBeVisible();
      await expect(multiSelect).toBeEnabled();
      await expect(multiSelect).toHaveAttribute("multiple");
    });

    await test.step("TC 19-20: Four options in the expected order", async () => {
      await expect(multiSelect.locator("option")).toHaveText([
        "Java",
        "Python",
        "JavaScript",
        "C#",
      ]);
    });

    await test.step("TC 21-22: Nothing selected on page load", async () => {
      await expect(multiSelect.locator("option:checked")).toHaveCount(0);
      await expect(result).toHaveText("Selected: none");
    });

    await test.step("TC 23: Select Java", async () => {
      await multiSelect.selectOption({ label: "Java" });
      await expect(multiSelect).toHaveValues(["java"]);
      await expect(result).toHaveText("Selected: java");
    });

    await test.step("TC 24: Select Java and Python together", async () => {
      // Pass the full set because selectOption replaces the selection.
      await multiSelect.selectOption([
        { label: "Java" },
        { label: "Python" },
      ]);
      await expect(multiSelect).toHaveValues(["java", "python"]);
      await expect(result).toHaveText("Selected: java, python");
    });

    await test.step("TC 25: Java + JavaScript + C# (Python must not be selected)", async () => {
      await multiSelect.selectOption([
        { label: "Java" },
        { label: "JavaScript" },
        { label: "C#" },
      ]);
      await expect(multiSelect).toHaveValues([
        "java",
        "javascript",
        "csharp",
      ]);
      await expect(multiSelect.locator("option:checked")).toHaveText([
        "Java",
        "JavaScript",
        "C#",
      ]);
      await expect(result).toHaveText("Selected: java, javascript, csharp");
    });

    await test.step("TC 26: Select all four options", async () => {
      await multiSelect.selectOption([
        { label: "Java" },
        { label: "Python" },
        { label: "JavaScript" },
        { label: "C#" },
      ]);
      await expect(multiSelect).toHaveValues([
        "java",
        "python",
        "javascript",
        "csharp",
      ]);
      await expect(result).toHaveText(
        "Selected: java, python, javascript, csharp",
      );
    });

    await test.step("TC 27: Deselect Python with Ctrl/Cmd + click", async () => {
      await multiSelect
        .locator('option[value="python"]')
        .click({ modifiers: ["ControlOrMeta"] });

      await expect(multiSelect).toHaveValues([
        "java",
        "javascript",
        "csharp",
      ]);
      await expect(result).toHaveText("Selected: java, javascript, csharp");
    });

    await test.step("TC 28: Click C# without Ctrl/Cmd", async () => {
      // A plain click in a multiple select clears the other selections.
      await multiSelect.locator('option[value="csharp"]').click();
      await expect(multiSelect).toHaveValues(["csharp"]);
      await expect(result).toHaveText("Selected: csharp");
    });

    await test.step("TC 29: Result text for multiple values", async () => {
      await multiSelect.selectOption([
        { label: "C#" },
        { label: "Java" },
      ]);

      // The page lists selected values in option/DOM order, not click order.
      await expect(multiSelect).toHaveValues(["java", "csharp"]);
      await expect(multiSelect.locator("option:checked")).toHaveText([
        "Java",
        "C#",
      ]);
      await expect(result).toHaveText("Selected: java, csharp");
    });
  });

  /**
   * Test case group 4: Custom div dropdown (TC 30-39).
   *
   * This is not a <select>, so selectOption() cannot be used. The test clicks
   * the toggle button and then the option. The page renders the <ul> only
   * while the menu is open, and selecting an option closes it.
   */
  test("4. Custom Div Dropdown Validation", async ({ page }) => {
    const toggle = page.getByTestId("custom-dropdown-toggle");
    const menu = page.getByTestId("custom-dropdown-menu");
    const result = page.getByTestId("custom-dropdown-result");

    await test.step("TC 30-32: Default state", async () => {
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveText("Choose...");
      await expect(result).toHaveText("Selected: Choose...");
      await expect(menu).not.toBeVisible();
    });

    await test.step("TC 33-35: Open the menu and read the options", async () => {
      await toggle.click();
      await expect(menu).toBeVisible();

      // The page has exactly three options: Alpha, Beta and Gamma.
      await expect(menu.locator("li")).toHaveText([
        "Alpha",
        "Beta",
        "Gamma",
      ]);
    });

    await test.step("TC 36-38: Choose Alpha, check the text and menu close", async () => {
      await page.getByTestId("custom-option-alpha").click();

      // The toggle button itself shows the selected label.
      await expect(toggle).toHaveText("Alpha");
      await expect(result).toHaveText("Selected: Alpha");
      await expect(menu).not.toBeVisible();
    });

    await test.step("TC 39: Choose a different option (Gamma)", async () => {
      await toggle.click();
      await expect(menu).toBeVisible();

      await page.getByTestId("custom-option-gamma").click();
      await expect(toggle).toHaveText("Gamma");
      await expect(result).toHaveText("Selected: Gamma");
      await expect(menu).not.toBeVisible();
    });
  });

  /**
   * TC 40 is a known limitation on the practice page: the custom dropdown does
   * NOT close when you click outside it. The test is marked as an expected
   * failure so the suite stays green today, but it will fail if the page is
   * fixed and the assertion starts passing. At that point, remove test.fail().
   */
  test("4b. TC 40: Custom dropdown closes on outside click", async ({ page }) => {
    test.fail(
      true,
      "Known limitation: the custom dropdown stays open on outside click",
    );

    const toggle = page.getByTestId("custom-dropdown-toggle");
    const menu = page.getByTestId("custom-dropdown-menu");

    await toggle.click();
    await expect(menu).toBeVisible();

    // Click the section heading, which is outside the dropdown.
    await page.locator("#section-4 h2").click();
    await expect(menu).not.toBeVisible();
  });

  /**
   * Test case group 5: Select populated from a state array (TC 41-49).
   */
  test("5. Select Populated from State Array Validation", async ({ page }) => {
    // Use the stable test id instead of ".practice-select".last().
    const dynamicSelect = page.getByTestId("dynamic-select");
    const result = page.getByTestId("dynamic-select-result");

    await test.step("TC 41-43: Visible, enabled and default option", async () => {
      await expect(dynamicSelect).toBeVisible();
      await expect(dynamicSelect).toBeEnabled();
      await expect(dynamicSelect).toHaveValue("");
      await expect(dynamicSelect.locator("option:checked")).toHaveText(
        "choose tool…",
      );
      await expect(result).toHaveText("Selected: none");
    });

    await test.step("TC 44-45: Five options in the expected order", async () => {
      await expect(dynamicSelect.locator("option")).toHaveText([
        "choose tool…",
        "Selenium",
        "Playwright",
        "Cypress",
        "Appium",
      ]);
    });

    await test.step("TC 46-47: Select Playwright by visible text", async () => {
      await dynamicSelect.selectOption({ label: "Playwright" });
      await expect(dynamicSelect).toHaveValue("Playwright");
      await expect(result).toHaveText("Selected: Playwright");
    });

    await test.step("TC 48: Select Appium by index", async () => {
      await dynamicSelect.selectOption({ index: 4 });
      await expect(dynamicSelect).toHaveValue("Appium");
      await expect(result).toHaveText("Selected: Appium");
    });

    await test.step("TC 49: Selenium then Cypress - only Cypress remains", async () => {
      await dynamicSelect.selectOption({ label: "Selenium" });
      await expect(dynamicSelect).toHaveValue("Selenium");

      await dynamicSelect.selectOption({ label: "Cypress" });
      await expect(dynamicSelect).toHaveValue("Cypress");
      await expect(result).toHaveText("Selected: Cypress");
    });
  });

  /**
   * Test case group 6: Additional cases (TC 50-55).
   * Split into focused tests so a failure points to one behaviour.
   */
  test("6a. TC 50-51: Each dropdown keeps its own value", async ({ page }) => {
    const standardSelect = page.getByTestId("standard-select");
    const multiSelect = page.getByTestId("multi-select");
    const customToggle = page.getByTestId("custom-dropdown-toggle");
    const dynamicSelect = page.getByTestId("dynamic-select");

    await test.step("TC 50: Choose one value in all four dropdowns", async () => {
      await standardSelect.selectOption({ label: "Red" });
      await expect(page.getByTestId("standard-select-result")).toHaveText(
        "Selected: red",
      );

      await multiSelect.selectOption({ label: "Java" });
      await expect(page.getByTestId("multi-select-result")).toHaveText(
        "Selected: java",
      );

      await customToggle.click();
      await page.getByTestId("custom-option-alpha").click();
      await expect(customToggle).toHaveText("Alpha");
      await expect(page.getByTestId("custom-dropdown-result")).toHaveText(
        "Selected: Alpha",
      );

      await dynamicSelect.selectOption({ label: "Playwright" });
      await expect(page.getByTestId("dynamic-select-result")).toHaveText(
        "Selected: Playwright",
      );
    });

    await test.step("TC 51: Change only the standard select", async () => {
      await standardSelect.selectOption({ label: "Green" });
      await expect(standardSelect).toHaveValue("green");
      await expect(page.getByTestId("standard-select-result")).toHaveText(
        "Selected: green",
      );

      // The other three dropdowns must keep their previous values.
      await expect(page.getByTestId("multi-select-result")).toHaveText(
        "Selected: java",
      );
      await expect(page.getByTestId("custom-dropdown-result")).toHaveText(
        "Selected: Alpha",
      );
      await expect(page.getByTestId("dynamic-select-result")).toHaveText(
        "Selected: Playwright",
      );
    });
  });

  test("6b. TC 52: Reload resets all dropdowns to their defaults", async ({
    page,
  }) => {
    const standardSelect = page.getByTestId("standard-select");
    const multiSelect = page.getByTestId("multi-select");
    const customToggle = page.getByTestId("custom-dropdown-toggle");
    const dynamicSelect = page.getByTestId("dynamic-select");

    await test.step("Set a non-default value in every dropdown", async () => {
      await standardSelect.selectOption({ label: "Red" });
      await multiSelect.selectOption({ label: "Java" });

      await customToggle.click();
      await page.getByTestId("custom-option-alpha").click();

      await dynamicSelect.selectOption({ label: "Playwright" });
    });

    await test.step("Reload and verify every dropdown is back to default", async () => {
      await page.reload();

      await expect(standardSelect).toHaveValue("");
      await expect(page.getByTestId("standard-select-result")).toHaveText(
        "Selected: none",
      );

      await expect(multiSelect.locator("option:checked")).toHaveCount(0);
      await expect(page.getByTestId("multi-select-result")).toHaveText(
        "Selected: none",
      );

      await expect(customToggle).toHaveText("Choose...");
      await expect(page.getByTestId("custom-dropdown-result")).toHaveText(
        "Selected: Choose...",
      );

      await expect(dynamicSelect).toHaveValue("");
      await expect(page.getByTestId("dynamic-select-result")).toHaveText(
        "Selected: none",
      );
    });
  });

  test("6c. TC 53: ArrowDown selects the next option", async ({ page }) => {
    const standardSelect = page.getByTestId("standard-select");
    const result = page.getByTestId("standard-select-result");

    // Focus the native select and press ArrowDown. Chromium moves from the
    // placeholder (index 0) to "Red" (index 1).
    await standardSelect.focus();
    await page.keyboard.press("ArrowDown");

    await expect(standardSelect).toHaveValue("red");
    await expect(result).toHaveText("Selected: red");
  });

  test("6d. TC 54: Selecting the same option twice is stable", async ({
    page,
  }) => {
    const standardSelect = page.getByTestId("standard-select");
    const result = page.getByTestId("standard-select-result");

    await standardSelect.selectOption({ label: "Red" });
    await standardSelect.selectOption({ label: "Red" });

    // No error occurs and the value does not change.
    await expect(standardSelect).toHaveValue("red");
    await expect(result).toHaveText("Selected: red");
  });

  test("6e. TC 55: Result text uses the expected casing", async ({ page }) => {
    const standardSelect = page.getByTestId("standard-select");
    const standardResult = page.getByTestId("standard-select-result");

    // Standard select prints the lowercase option VALUE, not the label.
    for (const { label, value } of [
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ]) {
      await standardSelect.selectOption({ label });
      await expect(standardResult).toHaveText(`Selected: ${value}`);
    }

    // Multi-select also prints lowercase values. "C#" becomes "csharp".
    const multiSelect = page.getByTestId("multi-select");
    await multiSelect.selectOption({ label: "C#" });
    await expect(page.getByTestId("multi-select-result")).toHaveText(
      "Selected: csharp",
    );

    // The dynamic select and the custom dropdown print the visible label.
    const dynamicSelect = page.getByTestId("dynamic-select");
    await dynamicSelect.selectOption({ label: "Cypress" });
    await expect(page.getByTestId("dynamic-select-result")).toHaveText(
      "Selected: Cypress",
    );

    const customToggle = page.getByTestId("custom-dropdown-toggle");
    await customToggle.click();
    await page.getByTestId("custom-option-gamma").click();
    await expect(page.getByTestId("custom-dropdown-result")).toHaveText(
      "Selected: Gamma",
    );
  });
});
