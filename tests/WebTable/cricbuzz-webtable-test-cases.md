# Test Cases: Cricbuzz Web Table (Live Scores and Scorecard)

**Application Used:** Cricbuzz
**URL:** https://www.cricbuzz.com/cricket-match/live-scores

> **Important notes (read first):**
>
> 1. I could not open this site. The tool that reads web pages is blocked for Cricbuzz. I did not see the real page. I wrote these test cases from the normal Cricbuzz layout. Anything I am not sure about is marked **(check on page)**. Open DevTools (F12) and check the real elements first.
> 2. The Live Scores page is a **list of match cards**. The real **web tables** are on the **Scorecard** page of a match (batting table, bowling table, and more). So these test cases start on the Live Scores page, open a match, and then test the tables.
> 3. The data is **live**. Scores change all the time. Do not hard-code values like "45 runs". Test the **rules** instead (for example: Total = sum of batter runs + extras). For stable data, open a **completed** match from the "Recent" matches.
> 4. Cricbuzz may use `div` elements, not a real `<table>`. Check in DevTools. This changes how you write the locators.
> 5. Cricbuzz may show ads, a cookie banner or pop-ups. These can block your clicks.

---

## 1. Live Scores Page Load Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 1 | Open the URL https://www.cricbuzz.com/cricket-match/live-scores | Page should load successfully |
| 2 | Verify the page title | Title should have "Cricbuzz" in it (check on page) |
| 3 | Verify the Cricbuzz logo and the main menu are visible | Logo and menu should be displayed |
| 4 | Verify that the list of match cards is visible | At least one match card should be visible, if a match is on today (check on page) |
| 5 | Verify one match card | Card should show team names, score or match status, and match links |
| 6 | Verify the links inside a match card | Links like "Live Score", "Scorecard", "Full Commentary" or "News" should be present (check on page) |

---

## 2. Open the Scorecard (Navigation)

| S.No | Steps | Expected Result |
|---|---|---|
| 7 | Locate the "Scorecard" link of the first match | Link should be visible |
| 8 | Click the "Scorecard" link | Scorecard page of that match should open |
| 9 | Verify the page URL | URL should have "scorecard" in it (check on page) |
| 10 | Verify the match title on the scorecard page | Title should have the same team names as the match card |
| 11 | Verify the tabs on the scorecard page | Tabs like "Live", "Scorecard", "Squads", "Commentary" should be visible (check on page) |
| 12 | Verify the "Scorecard" tab is active | Active tab should be "Scorecard" |

---

## 3. Batting Table Structure Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 13 | Locate the batting table of the first innings | Table should be visible |
| 14 | Read the column headers | Headers should be "Batter", "R", "B", "4s", "6s", "SR" (the dismissal column may have no header) (check on page) |
| 15 | Count the batter rows | There should be at least 2 rows |
| 16 | Verify that every row has the same number of cells | Every row should have the same cell count |
| 17 | Verify that no batter name is empty | Every row should have a name |
| 18 | Verify that no batter name is repeated | All names should be different |

---

## 4. Batting Table Data Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 19 | Read the "R" (runs) value of each batter | Each value should be a whole number, 0 or more |
| 20 | Read the "B" (balls) value of each batter | Each value should be a whole number, 0 or more |
| 21 | Read the "4s" and "6s" values of each batter | Each value should be a whole number, 0 or more |
| 22 | Check the rule: (4s x 4) + (6s x 6) is not more than R | Rule should be true for every batter |
| 23 | Check the "SR" (strike rate) value | SR should be a number |
| 24 | Check the rule: SR = (R / B) x 100, rounded to 2 decimals | Rule should be true for every batter who faced at least 1 ball |
| 25 | Check a batter with 0 balls | SR should be 0 or "-" (check on page) |
| 26 | Read the dismissal text of each batter | Text should be like "not out", "b <bowler>", "c <fielder> b <bowler>", "lbw b <bowler>", "run out (<fielder>)" or "st <keeper> b <bowler>" |
| 27 | Count the batters with "not out" in an innings in progress | There should be at most 2 batters with "not out" |
| 28 | Verify that a "not out" batter does not have a bowler name in the dismissal | Text should be only "not out" |
| 29 | Click on a batter name | Player profile page should open, if it is a link (check on page) |

---

## 5. Extras and Total Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 30 | Locate the "Extras" row | Row should be visible |
| 31 | Read the extras details | Text like "(b 0, lb 2, w 5, nb 1, p 0)" should be shown (check on page) |
| 32 | Check the rule: extras total = b + lb + w + nb + p | Rule should be true |
| 33 | Locate the "Total" row | Row should be visible |
| 34 | Verify the total format | Should be like "runs-wickets (overs Ov)", for example "150-5 (20 Ov)" (check on page) |
| 35 | Check the rule: Total runs = sum of all batter runs + extras | Rule should be true |
| 36 | Check the rule: Total wickets = number of dismissed batters | Rule should be true (check on page for "retired hurt") |
| 37 | Verify the overs format | The part after the dot should be 0 to 5 only (for example 19.4 is valid, 19.7 is not) |
| 38 | Verify the "Did not bat" or "Yet to bat" list | Names should be shown, and none of them should be in the batting table |

---

## 6. Fall of Wickets Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 39 | Locate the "Fall of Wickets" section | Section should be visible, if at least 1 wicket has fallen |
| 40 | Verify the format of each item | Should show score-wicket number, batter name and over (check on page) |
| 41 | Check that the wicket numbers go 1, 2, 3, and so on | Numbers should be in order |
| 42 | Check that the score only goes up from one wicket to the next | Each score should be equal or more than the one before |
| 43 | Verify that the number of items matches the total wickets | Both should be equal (check on page for "retired hurt") |
| 44 | Verify that every name in this list is also in the batting table | All names should match |

---

## 7. Bowling Table Structure and Data Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 45 | Locate the bowling table of the first innings | Table should be visible |
| 46 | Read the column headers | Headers should be "Bowler", "O", "M", "R", "W", "NB", "WD", "ECO" (check on page) |
| 47 | Count the bowler rows | There should be at least 1 row |
| 48 | Verify that every row has the same number of cells | Every row should have the same cell count |
| 49 | Verify that no bowler name is repeated | All names should be different |
| 50 | Read O, M, R, W, NB and WD of each bowler | O can have a decimal; the others should be whole numbers, 0 or more |
| 51 | Check the rule: M (maidens) is not more than O (overs) | Rule should be true |
| 52 | Check the rule: ECO = R / overs, rounded to 2 decimals (convert 4.3 overs to 4.5 before you divide) | Rule should be true |
| 53 | Check the rule: one bowler has no more than the maximum overs for the format (T20: 4, ODI: 10) | Rule should be true |
| 54 | Check the rule: sum of bowler W is not more than total wickets | Rule should be true (run outs are not given to the bowler) |
| 55 | Check the rule: sum of bowler R = total runs - byes - leg byes | Rule should be true |
| 56 | Check the rule: sum of bowler overs = total overs of the innings | Rule should be true |

---

## 8. Multiple Innings Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 57 | Verify the number of innings shown | Number should match the match status (1 or 2 for limited overs, up to 4 for a Test) |
| 58 | Verify the header of each innings | Team name and score should be shown |
| 59 | Click the header of a different innings | Table of that innings should open or show, if tabs or a collapse is used (check on page) |
| 60 | Verify that each innings has its own batting and bowling table | Both tables should be present |
| 61 | Verify that the bowling team of innings 1 is the batting team of innings 2 | Team names should match |
| 62 | Compare the innings header score with the "Total" row | Both should be equal |

---

## 9. Live Match Validation

| S.No | Steps | Expected Result |
|---|---|---|
| 63 | Open the scorecard of a live match | Match status should show it is live (check on page) |
| 64 | Wait 1 to 2 minutes, then refresh the page | Score may change; the table should still follow all the rules above |
| 65 | Verify that the total in the scorecard matches the total on the Live Scores page | Both should be equal (small delay is possible) |
| 66 | Open the scorecard of a completed match (from "Recent") | Result text like "won by ..." should be visible |
| 67 | Verify that all batters have a dismissal text in a completed innings | At most 2 "not out" (or 1 if all out) |

---

## 10. Additional (Recommended) Test Cases

| S.No | Steps | Expected Result |
|---|---|---|
| 68 | Open the scorecard of a match that has not started | Tables should not show; a message may show (check on page) |
| 69 | Open the Live Scores page when no match is on | A "no live matches" message may show (check on page) |
| 70 | Resize the browser window to a small width | Table should be readable or scroll sideways |
| 71 | Go back with the browser Back button | Live Scores page should open again |
| 72 | Verify that the page has no broken text like "undefined" or "NaN" in the tables | No such text |

---

## Tips

- **Remember this:** For live data, test the rules, not fixed numbers. Fixed numbers change in a few minutes.
- First check if the tables are real `<table>` elements or `div` elements. Use DevTools.
- Use a **completed match** when you want stable data to practise.
- Cricbuzz is a public site with its own terms. Run your tests slowly. Do not run them again and again in a loop.
- Handle pop-ups and the cookie banner first, or your click may fail.

---

# Git and GitHub Flow for This Task

Use the same 12-step flow as before. Only the names change.

**Replace these placeholders:**

- `<number>` = your learning day number
- `<issue>` = the GitHub Issue number

| Item | Name |
|---|---|
| Issue title | Day <number>: Cricbuzz web table practice |
| Branch | feature/day-<number>-cricbuzz-web-table |
| Folder | tests/day-<number>-cricbuzz-web-table/ |
| PR title | Day <number>: Cricbuzz web table practice |

> **Golden rule:** Never commit on `main`.

## Start of day

```bash
git switch main
git pull
git switch -c feature/day-<number>-cricbuzz-web-table
```

Create the Issue on GitHub first (**Issues** tab, then **New issue**). Use the Issue title from the table. Write down the Issue number.

## Files and commits (one small change = one commit)

```text
tests/day-<number>-cricbuzz-web-table/
  cricbuzz-webtable-test-cases.md
  batting-table.spec.ts
  bowling-table.spec.ts
  totals-and-extras.spec.ts
  notes.md
```

```bash
git status
git add tests/day-<number>-cricbuzz-web-table/cricbuzz-webtable-test-cases.md
git commit -m "#<issue>: add cricbuzz web table test cases"
```

```bash
git add tests/day-<number>-cricbuzz-web-table/batting-table.spec.ts
git commit -m "#<issue>: add batting table tests"
```

```bash
git add tests/day-<number>-cricbuzz-web-table/bowling-table.spec.ts
git commit -m "#<issue>: add bowling table tests"
```

```bash
git add tests/day-<number>-cricbuzz-web-table/totals-and-extras.spec.ts
git commit -m "#<issue>: add totals and extras tests"
```

```bash
git add tests/day-<number>-cricbuzz-web-table/notes.md
git commit -m "#<issue>: add notes for cricbuzz web table"
```

## Update, test, push

```bash
git fetch
git pull origin main
npx playwright test
git push -u origin feature/day-<number>-cricbuzz-web-table
```

## Pull Request

1. Click **Compare & pull request** on GitHub.
2. Title: `Day <number>: Cricbuzz web table practice`
3. Description:

```text
## What I did
- Wrote test cases for the Cricbuzz scorecard tables
- Wrote Playwright tests for batting, bowling, totals and extras

## How to run
npx playwright test tests/day-<number>-cricbuzz-web-table/

## What I learned
- (write 2 or 3 simple lines)

Closes #<issue>
```

4. Open the **Files changed** tab and check:
   - No `node_modules`, `test-results` or `playwright-report` folders.
   - Clear names and double quotes everywhere.
   - All tests pass, and every test has an `expect`.
5. If all is good: **Merge pull request**, then **Confirm merge**, then **Delete branch**.

## Clean up

```bash
git switch main
git pull
git branch -d feature/day-<number>-cricbuzz-web-table
```

**Remember this:** Pull `main` first, work on your own branch, test before push, and clean up after merge.
