import { expect, test } from '@playwright/test';

test('index page has expected content', async ({ page }) => {
	await page.goto('/');
	// Replace with appropriate initial assertion based on your index page content
	await expect(page.locator('body')).toBeVisible();
});
