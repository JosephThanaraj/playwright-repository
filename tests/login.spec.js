// @ts-check
import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL(/saucedemo/);
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
});

test('Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL(/saucedemo/);
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByPlaceholder('Username').fill('unknown_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

