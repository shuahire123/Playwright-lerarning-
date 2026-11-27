import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.beforeEach("Open practice page", async ({ page }) => {
  await page.goto("https://www.sreenidhirajakrishnan.com/practice");
});

test("TC01 — File upload: select a file and assert the file name is shown", async ({ page }) => {
  const fileInput = page.getByTestId("file-upload");
  const uploadResult = page.getByTestId("file-upload-result");
  const section16 = page.locator("#section-16");

  await expect(section16.getByRole("heading")).toHaveText("Section 16: File Upload");
  await expect(uploadResult).toHaveText("No file selected");
  await expect(fileInput).toHaveAttribute("type", "file");

  const uploadFile = path.join(__dirname, "Get_Started_With_Smallpdf_smallpdf.pdf");
  const fileName = path.basename(uploadFile);

  await fileInput.setInputFiles(uploadFile);

  await expect(uploadResult).toHaveText(fileName);
  const selectedFileName = await fileInput.evaluate(
    (el: HTMLInputElement) => el.files?.[0]?.name ?? ""
  );
  expect(selectedFileName).toBe(fileName);
  await expect(page).toHaveURL(/\/practice/);
});

test("TC02 — File download: click the button and assert the file name, result text and content", async ({ page }) => {
  const downloadBtn = page.getByTestId("download-btn");
  const downloadResult = page.getByTestId("download-result");
  const section17 = page.locator("#section-17");

  await expect(section17.getByRole("heading")).toHaveText("Section 17: Download");
  await expect(downloadResult).toHaveText("Not downloaded");
  await expect(downloadBtn).toBeVisible();
  await expect(downloadBtn).toBeEnabled();
  await expect(downloadBtn).toHaveText("Download practice.txt");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadBtn.click(),
  ]);

  expect(download.suggestedFilename()).toBe("practice.txt");
  await expect(downloadResult).toHaveText("Download triggered: practice.txt");

  const content = await fs.promises.readFile(await download.path(), "utf8");
  expect(content).toBe("This is a practice download file.");
  await expect(page).toHaveURL(/\/practice/);
});
