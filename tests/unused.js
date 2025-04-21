// @ts-check
// import { test, expect, _baseTest } from '@playwright/test';
// Unused test spec file

/* test('Adding and Removing Items to/in cart', async ({ page }) => {
  const product_onesie = page.getByText('Sauce Labs Onesie');
  const add_to_cart = page.getByRole('button', {name: "Add to cart"});

  await expect(page).toHaveURL(/inventory/);
  //Find the item wanted
  await expect(product_onesie).toBeVisible();
  await product_onesie.click();
  await expect(product_onesie).toBeVisible();
  
  //Add to cart
  await expect(add_to_cart).toBeVisible();
  await add_to_cart.click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(1); //Verify Item count in cart has increased
  await expect(page.getByRole('button', {name: "Remove"})).toBeVisible();

  //Go to Cart and remove item
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);
  await expect(product_onesie).toBeVisible(); //Check item to be removed is in the cart
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0); //Check item in the cart has been removed
}); */