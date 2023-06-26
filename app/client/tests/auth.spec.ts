import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.goto('http://localhost:8080/login');
  await page.getByPlaceholder('Insomniak').click();
  await page.getByPlaceholder('Insomniak').fill('Hikuro');
  await page.getByPlaceholder('Insomniak').press('Tab');
  await page.getByPlaceholder('Changez moi !').fill('Loan26111!');
  await page.locator('form').getByRole('img').nth(2).click();
  await page.getByPlaceholder('Changez moi !').click();
  await page.getByPlaceholder('Changez moi !').press('ArrowLeft');
  await page.getByPlaceholder('Changez moi !').fill('Loan2611!');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Collection' }).click();
  await page.locator('div:nth-child(12) > .yugi-card__translater > .yugi-card__rotator').click();
  await page.locator('div:nth-child(12) > .yugi-card__translater > .yugi-card__rotator').click();
  await page.getByPlaceholder('Rechercher').click();
  await page.getByPlaceholder('Rechercher').fill('White Dragon');
  await page.getByPlaceholder('Rechercher').press('Enter');
  await page.waitForTimeout(1000);
  await page.locator('div:nth-child(3) > .yugi-card__translater > .yugi-card__rotator').click();
});