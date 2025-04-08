// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
  });

test('Navigating to Product Item page', async ({ page }) => {
    const product_backpack = page.getByText('Sauce Labs Backpack');
    const product_fleece_jacket = page.getByText('Sauce Labs Fleece Jacket');

    await expect(product_backpack).toBeVisible();
    await product_backpack.click();
    await expect(product_backpack).toBeVisible();

    //Navigate back to inventory page and check for another product
    await page.getByRole('button', {name: "Back to products"}).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(product_fleece_jacket).toBeVisible();
    await product_fleece_jacket.click();
    await expect(product_fleece_jacket).toBeVisible();
});
