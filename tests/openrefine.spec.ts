import { test, expect } from '@playwright/test';

// Create test screenshots
// npx playwright test --update-snapshots


// Allow minor difference - eg in the new version
const config: PlaywrightTestConfig = {
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
};
export default config;

test('test', async ({ page }) => {
  // Go to http://localhost:8888/login?next=%2Ftree%3F
  await page.goto('http://localhost:8888/login?next=%2Ftree%3F');
  await expect(page).toHaveScreenshot('notebook-login-page.png');
  // Click text=Password or token: Log in >> input[name="password"]
  await page.locator('text=Password or token: Log in >> input[name="password"]').click();
  // Fill text=Password or token: Log in >> input[name="password"]
  await page.locator('text=Password or token: Log in >> input[name="password"]').fill('letmein');
  // Press Enter
  await page.locator('text=Password or token: Log in >> input[name="password"]').press('Enter');
  await expect(page).toHaveURL('http://localhost:8888/tree?');
  await expect(page).toHaveScreenshot('notebook_homepage-test.png');
  // Click text=New Toggle Dropdown
  await page.locator('text=New Toggle Dropdown').click();
  await expect(page).toHaveScreenshot('notebook_new-test.png');
  // Click a[role="menuitem"]:has-text("OpenRefine")
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[role="menuitem"]:has-text("OpenRefine")').click()
  ]);
  await page1.waitForSelector('#right-panel');
  await expect(page1).toHaveScreenshot('openrefine-homepage.png');
});