import { expect, test } from '@playwright/test';

test.describe('Authentication & Landing Page', () => {
	test('Unauthenticated state (Welcome message, Login button)', async ({ page }) => {
		// Intercept network requests if needed or just clear storage/cookies
		await page.context().clearCookies();
		
		// In a SvelteKit app, state might be hydrated from server or hardcoded in stores.
		// Since auth.svelte.ts has a hardcoded default user, we need to log out.
		await page.goto('/');

		// Wait for SvelteKit to be ready and clear the store if exposed, 
		// but since it's a module level variable, we can click the logout button first if it exists.
		// Let's check if the logout button is present (meaning we are logged in by default)
		const logoutButtonTarget = page.locator('button[title="Log out"]');
		if (await logoutButtonTarget.isVisible()) {
			await logoutButtonTarget.click();
		}

		// The welcome message should be visible
		await expect(page.locator('h1')).toHaveText(/Welcome to SvelteKit goodroc/i);
		await expect(page.locator('text=/Sign in with Google to sync/i')).toBeVisible();

		// Check for the Google Login button text anywhere in the page
		// Because the sidebar is hidden on small screens, we might need a broader selector
		await expect(page.locator('text=Google Login').first()).toBeVisible();
		// Based on +page.svelte, there's no explicit login button on the page itself, 
		// but there are feature cards.
		await expect(page.locator('h3', { hasText: 'Google Drive SSOT' })).toBeVisible();
	});

	// To test authenticated state, we can mock the authStore initialization
	// This should be done as a top-level skip if we are not implementing it yet, 
	// rather than inside the test callback.
	test.skip('Authenticated state mock (Viewing Drive Root)', async () => {
	});
});
