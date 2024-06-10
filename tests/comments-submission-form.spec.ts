import { test, expect } from '@playwright/test';

test('should not show review form to an unauthorized user', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.locator('.place-card__name').first().click();
  await page.waitForSelector('.reviews');
  await expect(page.locator('.reviews__form')).not.toBeVisible();
});

test('should send review by authorized user', async ({ page }) => {
  const email = 'mercymainer228@overwatch.ru';
  const password = 'top1234'
  const rating = 'perfect';
  const comment = `But you did not have to cut me off...
    Make out like it never happened and that we were nothing...
    And I don't even need your love...
    But you treat me like a stranger, and that feels so rough...`;

  await page.goto('http://localhost:5173/login');

  await page.fill('input[name=email]', email);
  await page.fill('input[name=password]', password);
  await page.click('button[type=submit]');
  await page.waitForSelector('.cities__card');

  await page.locator('.place-card__name').first().click();

  await page.waitForSelector('.reviews');
  await expect(page.locator('.reviews__form')).toBeVisible();

  await page.fill('[name="review"]', comment);
  await page.getByTitle(rating).click();
  expect(page.locator('button[type="submit"]')).toBeEnabled();

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes('/comments') && resp.status() === 201
    ),
    page.click('button[type="submit"]'),
  ]);

  const reviewText = await page.locator('.reviews__text').first().textContent();
  const reviewAuthor = (await page.locator('.reviews__user-name').first().textContent())?.trim();
  expect(reviewText).toBe(comment);
  expect(reviewAuthor).toBe('mercymainer228');
});
