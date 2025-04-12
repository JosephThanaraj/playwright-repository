// @ts-check
import { test, expect } from '@playwright/test';

// Helper function to add items to the cart
async function addItemToCart(page, itemSelector) {
  const item = page.locator(`[data-test="add-to-cart-${itemSelector.toLowerCase().replace(/ /g, '-')}"]`);
  await expect(item).toBeVisible();
  await item.click();
}

// Helper function to verify items in the cart
async function verifyItemsInCart(page, items) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  for (const item of items) {
    await expect(page.locator('[data-test="inventory-item-name"]').getByText(item)).toBeVisible();
  }
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
  });

test('Navigating to Product Item page', async ({ page }) => {
    const product_backpack = page.getByText('Sauce Labs Backpack');
    
    //Find and select the item wanted
    await expect(product_backpack).toBeVisible();
    await product_backpack.click();
    await expect(product_backpack).toBeVisible();
    
    //Navigate back to inventory page and check for another product
    await page.getByRole('button', {name: "Back to products"}).click();
    await expect(page).toHaveURL(/inventory/);
});
test.describe('Cart Interactions', () => {
  test('Add and Verify Items in cart', async ({ page }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt'];
    //Add items to cart from inventory page
    for (const item of items){
      await addItemToCart(page, item);
    } 
    //Verify cart badge count
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(`${items.length}`);  
    //Verify items in cart
    await verifyItemsInCart(page, items);
  });

  test('User Checkout items in Cart', async ({ page }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt'];
    //Add items to cart from inventory page
    for (const item of items){
      await addItemToCart(page, item);
    }
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Initiate checkout process
    await page.getByRole('button', {name: 'Checkout'}).click();
    await expect(page).toHaveURL(/checkout-step-one/);

    //Fill out checkout form
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', {name: 'Continue'}).click();

    //Proceed to Overview page
    await expect(page).toHaveURL(/checkout-step-two/);

    //Verify items in overview page
    for (const item of items) {
      await expect(page.locator('[data-test="inventory-item-name"]').getByText(item)).toBeVisible();
    }

    //Complete the order
    await page.getByRole('button', {name: 'Finish'}).click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});
