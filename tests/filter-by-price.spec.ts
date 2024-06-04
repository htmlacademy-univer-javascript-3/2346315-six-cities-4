import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.locator('.cities__card').first().waitFor();

  const filterMenu = await page.locator('.places__sorting-type').first();
  filterMenu.click();
});

test('cards should be filtered from low to high price', async ({page}) => {
  const filters = await page.locator('.places__option').all();
  await filters[1].click();

  await page.locator('.places__found').first().waitFor();
  await page.locator('.cities__card').first().waitFor();

  const cardElements = await page.locator('.cities__card').all();
  expect(cardElements.length).toBeGreaterThan(0);

  const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

  const prices = await Promise.all(pricesLocators.map(async (locator) => {
    const text = await locator.innerText();
    return parseInt(text.replace('€', '').trim());
  }));

  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});

test('cards should be filtered from high to low price', async ({page}) => {
  const filters = await page.locator('.places__option').all();
  await filters[2].click();

  await page.locator('.places__found').first().waitFor();
  await page.locator('.cities__card').first().waitFor();

  const cardElements = await page.locator('.cities__card').all();
  expect(cardElements.length).toBeGreaterThan(0);

  const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

  const prices = await Promise.all(pricesLocators.map(async (locator) => {
    const text = await locator.innerText();
    return parseInt(text.replace('€', '').trim());
  }));

  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
});
