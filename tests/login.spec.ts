import { test, expect } from '@playwright/test'

test('should login the user', async ({ page }) => {
  const email = 'mercymainer228@overwatch.ru';
  const password = 'top1'

  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);

  await page.click('button[type="submit"]');
  await page.waitForResponse((resp) => resp.url().includes('/six-cities/login') && resp.status() === 201);

  await page.waitForURL('http://localhost:5173/');

  const element = await page.locator('.header__user-name');
  const text = await element.getAttribute('data-test');

  expect(text).toEqual(email);
});

test('should not login user', async ({ page }) => {
  const email = 'mercymainer228@overwatch.ru';
  const password = 'top'

  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);

  await Promise.all([
    page.waitForResponse(
        (response) => response.url().includes('/login') && response.status() === 400
    ),
    page.click('button[type="submit"]')
  ]);
});


