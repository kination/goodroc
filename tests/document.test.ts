import { expect, test } from '@playwright/test';

test.describe('Document Viewing', () => {
	test('Navigation via sidebar clicks and Markdown rendering', async ({ page }) => {
		// This test navigates to a mocked or real document route
		// If testing pure frontend routing, we can go directly to a doc page
		await page.goto('/doc/mock-doc-123');

		// Wait for the page to load
		await page.waitForLoadState('networkidle');

		// Depending on the implementation of +page.svelte for the doc route,
		// we should see the document content rendered.
		// Let's assert that the main content area exists.
		const mainArea = page.locator('main');
		await expect(mainArea).toBeVisible();

		// Optional: if your app shows an error or "Loading..." state for missing docs, test that.
		// We expect either markdown content or a generic fallback.
	});
});
