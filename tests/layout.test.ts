import { expect, test } from '@playwright/test';

test.describe('Global Layout & Search', () => {
	test('Cmd+K search modal toggle', async ({ page }) => {
		await page.goto('/');

		// Verify search modal is initially hidden
		const searchInput = page.getByPlaceholder('Search documentation (WASM powered)...');
		await expect(searchInput).not.toBeVisible();

		// Trigger Cmd+K (Meta+K) or Ctrl+K
		const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
		await page.keyboard.press(`${modifier}+k`);

		// Search modal should now be visible
		// We might need a small timeout if there's an animation
		await expect(searchInput).toBeVisible({ timeout: 5000 });
	});

	test('Sidebar rendering and responsiveness', async ({ page }) => {
		await page.goto('/');

		const sidebar = page.locator('aside'); // Assuming sidebar is an <aside>
		
		// In our layout, aside could be hidden on small screens
		// We make sure it exists, but might only be visible on desktop width
		if (page.viewportSize()?.width && page.viewportSize()!.width > 768) {
			await expect(sidebar).toBeVisible();
		}
	});
});
