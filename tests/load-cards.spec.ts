import { test, expect } from '@playwright/test';

test('should receive offers and display offer card', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('.cities__places')).toHaveCount(0);
    await page.waitForResponse((resp) => resp.url().includes('/offers') && resp.status() === 200);
    await expect(page.locator('.cities__places')).toHaveCount(1);
  });
