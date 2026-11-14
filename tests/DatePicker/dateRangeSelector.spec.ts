import { test, expect } from "@playwright/test";

test("date picker automation", async ({ page }) => {
    test.setTimeout(90_000);

    await page.goto("https://www.booking.com/");
    await expect(page).toHaveTitle("Booking.com | Official site | The best hotels, flights, car rentals & accommodations ");

    // The sign-in popup appears once the page has hydrated. Waiting for it
    // also ensures the destination autocomplete is ready, then dismiss it so
    // it cannot intercept clicks.
    const dismissSignIn = page.getByRole("button", { name: "Dismiss sign-in info." });
    await dismissSignIn.waitFor({ state: "visible", timeout: 15_000 }).catch(() => {});
    if (await dismissSignIn.isVisible().catch(() => false)) {
        await dismissSignIn.click();
    }

    const destination = page.getByPlaceholder("Where are you going?");
    await expect(destination).toBeVisible();
    await expect(destination).toBeEnabled();
    await destination.click();
    await destination.fill("Chennai");

    // Wait for the autocomplete and select the station by its accessible name.
    const station = page.getByRole("option", { name: /Chennai Central Train Station/ });
    await expect(station).toBeVisible({ timeout: 10_000 });
    await station.click();

    const dates = page.getByTestId("searchbox-dates-container");
    const calendar = page.getByTestId("searchbox-datepicker-calendar");

    // Selecting a destination opens the calendar automatically. Only click the
    // dates button if it is still closed, otherwise the click closes it.
    if (await dates.getAttribute("aria-expanded") !== "true") {
        await dates.click();
    }
    await expect(calendar).toBeVisible();

    const nextBtn = page.getByRole("button", { name: "Next month" });
    const monthHeading = (name: string) =>
        calendar.getByRole("heading", { name, exact: true });

    // Re-check the visible months after every click. The calendar only renders
    // two months at a time, so iterating over `year.all()` would stop after 2.
    async function goToMonth(name: string, maxClicks = 16) {
        for (let i = 0; i < maxClicks; i++) {
            if (await monthHeading(name).count() > 0) {
                return;
            }
            if (await nextBtn.count() === 0) {
                throw new Error(`Cannot reach ${name}: it is beyond Booking.com's max date`);
            }
            await nextBtn.click();
        }
        throw new Error(`Could not reach ${name}`);
    }

    // Check-in: January 30, 2028.
    // The calendar shows December 2027 + January 2028 at this point, so search
    // by the stable data-date attribute instead of the day text (which also
    // matches December 30, 2027).
    const checkIn = calendar.locator('[data-date="2028-01-30"]');
    await goToMonth("January 2028");
    await expect(checkIn).not.toHaveAttribute("aria-disabled", "true");
    await checkIn.click();
    await expect(checkIn).toHaveAttribute("aria-checked", "true");

    // Check-out: February 12, 2028.
    // March 2028 is beyond Booking.com's booking window (the "Next month"
    // button disappears at January/February 2028), so use a reachable date.
    const checkOut = calendar.locator('[data-date="2028-02-12"]');
    await goToMonth("February 2028");
    await expect(checkOut).not.toHaveAttribute("aria-disabled", "true");
    await checkOut.click();
    await expect(checkOut).toHaveAttribute("aria-checked", "true");

    // Verify the search box now shows the selected range.
    await expect(dates).toContainText("Jan 30");
    await expect(dates).toContainText("Feb 12");
});
