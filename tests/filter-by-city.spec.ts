import { test, expect, Locator } from '@playwright/test';

test('filter by city', async ({ page }) => {
  const isCityActive = async (locator: Locator) => {
    const classList = await locator.evaluate((el) => [...el.classList]);
    return classList.includes('tabs__item--active');
  };

  await page.goto('http://localhost:5173');
  await page.waitForSelector('.locations__item-link');

  const cityLinks = await page.locator('.locations__item-link').all();

  for (const li of cityLinks) {
    await li.click();
    const currentCity = await li.textContent();

    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    const isCitySelected = await isCityActive(li);
    expect(isCitySelected).toBeTruthy();

    const foundText = await page.locator('.places__found').textContent();
    const choosenCity = foundText?.split(' ').pop();

    expect(currentCity).toBe(choosenCity);
  }
});
