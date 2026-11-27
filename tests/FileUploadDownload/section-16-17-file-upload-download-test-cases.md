# Test Cases: Section 16 File Upload and Section 17 Download

**Application Used:** Automation Practice Playground
**URL:** https://www.sreenidhirajakrishnan.com/practice#section-16
**Sections covered:** Section 16: File Upload and Section 17: Download

**What the sections say:**
- Section 16: Practise uploading a file and verifying the selected file name appears.
- Section 17: Practise triggering a file download (practice.txt) and asserting on the downloaded file.

**Verified on:** 27 November 2026 against the live page. The element attributes, result strings and downloaded file content below were checked in the page source and rendered HTML.

**Precondition for every test case:**

- The browser is open and downloads are allowed (`acceptDownloads: true`, which is the Playwright default).
- The URL is loaded successfully and the relevant section is visible (scroll to it if needed).
- Each test case starts with a fresh page load, so no result text is left over from an earlier test.
- A small local text file is ready to upload, for example `sample.txt` in the project folder.

---

## 1. Verified Page Facts

### 1.1 Elements

| Element | Section | id | data-testid | aria-label | Visible text / initial state |
|---|---|---|---|---|---|
| File input | 16 | `file-upload` | `file-upload` | `File upload` | `type="file"`, `name="file-upload"`, no file selected |
| Upload result line | 16 | — | `file-upload-result` | — | `No file selected` |
| Download button | 17 | `download-btn` | `download-btn` | `Download file` | `Download practice.txt` |
| Download result line | 17 | — | `download-result` | — | `Not downloaded` |
| Section containers | 16 / 17 | `section-16` / `section-17` | — | — | `Section 16: File Upload` / `Section 17: Download` |

### 1.2 Behaviour confirmed in the page code

| Action | What the page does | Result line after the action |
|---|---|---|
| Select a file in the file input | Reads `files[0].name` (file name only, no path) | `<file name>`, e.g. `sample.txt` |
| Clear the file input | Fires the change event with no file | `No file selected` |
| Click `Download practice.txt` | Creates a `text/plain` Blob, downloads it via a temporary object URL, and revokes the URL | `Download triggered: practice.txt` |

### 1.3 Exact strings to assert

| State | Exact text |
|---|---|
| Upload result before selecting a file | `No file selected` |
| Upload result after selecting `sample.txt` | `sample.txt` |
| Download result before clicking | `Not downloaded` |
| Download result after clicking | `Download triggered: practice.txt` |
| Downloaded file name | `practice.txt` |
| Downloaded file content | `This is a practice download file.` |

**Note:** The upload result is only the file name. It does not include a path, a prefix such as `Selected:`, or any extra punctuation. The result strings are case-sensitive.

---

## 2. Test Cases

### TC01 — File upload: select a file and assert the file name is shown

| S.No | Step | Action | Expected Result / Assertion |
|---|---|---|---|
| 1 | Navigate | Open `https://www.sreenidhirajakrishnan.com/practice#section-16` | Page loads; `Section 16: File Upload` heading is visible |
| 2 | Check initial state | Read the upload result line before selecting a file | Text is exactly `No file selected` |
| 3 | Check control | Locate the file input | Input is visible and has `type="file"` |
| 4 | Upload | Attach `sample.txt` to the file input (`setInputFiles`) | File is selected; no page error occurs |
| 5 | Assert result | Read `file-upload-result` after the upload | Text is exactly `sample.txt` |
| 6 | Assert selected file | Read the input's `files` value | Selected file name is `sample.txt`; no path is displayed |
| 7 | Assert no navigation | Check the URL after the upload | URL is still the `/practice` page; the page did not reload |

**Playwright hint (for your automation):**

```ts
const fileName = "sample.txt";
await page.goto("https://www.sreenidhirajakrishnan.com/practice#section-16");
await expect(page.getByTestId("file-upload-result")).toHaveText("No file selected");

await page.getByTestId("file-upload").setInputFiles("tests/FileUploadDownload/" + fileName);

await expect(page.getByTestId("file-upload-result")).toHaveText(fileName);
await expect(page.getByTestId("file-upload")).toHaveValue(""); // value is masked, assert via files:
const selected = await page.getByTestId("file-upload").evaluate(
  (el: HTMLInputElement) => el.files?.[0]?.name ?? ""
);
expect(selected).toBe(fileName);
```

> Note: browsers mask a file input's `value` for security, so `toHaveValue` is not a reliable assertion here. Prefer the result line and/or the `files[0].name` check shown above.

---

### TC02 — File download: click the button and assert the file name, result text and content

| S.No | Step | Action | Expected Result / Assertion |
|---|---|---|---|
| 1 | Navigate | Open `https://www.sreenidhirajakrishnan.com/practice#section-17` | Page loads; `Section 17: Download` heading is visible |
| 2 | Check initial state | Read the download result line before clicking | Text is exactly `Not downloaded` |
| 3 | Check control | Locate the download button | Button is visible, enabled, and text is `Download practice.txt` |
| 4 | Download | Click the button and capture the `download` event (`waitForEvent("download")`) | Exactly one download starts; no new tab or navigation occurs |
| 5 | Assert file name | Read the suggested file name from the download object | Name is exactly `practice.txt` |
| 6 | Assert result | Read `download-result` after the click | Text is exactly `Download triggered: practice.txt` |
| 7 | Assert file content | Save the download and read its contents | Content is exactly `This is a practice download file.` (no extra whitespace) |
| 8 | Assert file type | Check the saved file | It is a plain text file (`.txt`), not empty |

**Playwright hint (for your automation):**

```ts
await page.goto("https://www.sreenidhirajakrishnan.com/practice#section-17");
await expect(page.getByTestId("download-result")).toHaveText("Not downloaded");

const downloadPromise = page.waitForEvent("download");
await page.getByTestId("download-btn").click();
const download = await downloadPromise;

expect(download.suggestedFilename()).toBe("practice.txt");
await expect(page.getByTestId("download-result")).toHaveText("Download triggered: practice.txt");

const path = await download.path();
const content = fs.readFileSync(path, "utf8");
expect(content).toBe("This is a practice download file.");
```

---

## 3. Notes for Automation

- Both result lines are plain `<p>` elements. There is no form submission and no server call: the upload only reads the local file name in the browser, and the download is created with a Blob. Do not expect an API request to assert against.
- Because the download uses a temporary object URL, start waiting for the download event **before** clicking the button.
- `download.path()` is available in local runs; for remote or connected-over-CDP runs use `download.createReadStream()` instead.
- Playwright enables downloads by default, but if your project disables them, set `acceptDownloads: true` in the context or test use options.
- Keep the upload fixture file small and commit it with the tests, so the test is repeatable on another machine.
- Assertion checklist for both tests: initial result text, post-action result text, exact file name, and downloaded file content.
