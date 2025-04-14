// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage, CheckoutPage1, OverviewPage } from '../pages/cart.page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);
  await loginPage.enterUsername('standard_user');
  await loginPage.enterPassword('secret_sauce');
  await loginPage.clickLogin();
});

test('Navigating to Product Item page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    //Find and select the item wanted
    await inventoryPage.findItem('Sauce Labs Backpack');
    await inventoryPage.clickItem('Sauce Labs Backpack');
    
    //Navigate back to inventory page and check for another product
    await page.getByRole('button', {name: "Back to products"}).click();
    await expect(page).toHaveURL(/inventory/);
});

//Using test.describe as a way to group test cases
test.describe('Cart Interactions', () => {
  test('Add and Verify Items in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const items = ['Sauce Labs Backpack'];
    //Add items to cart from inventory page
    for (const item of items){
      await inventoryPage.addItemToCart(item);
    } 
    //Verify cart badge count (exclusive to this test case)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(`${items.length}`);  
    //Verify items in cart
    await inventoryPage.cartIcon.click();
    for (const item of items) {
      await cartPage.verifyItemsInCart(item);
    }
  });

  test('User Checkout items in Cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage1 = new CheckoutPage1(page);
    const overviewPage = new OverviewPage(page);

    const items = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt'];
    //Add items to cart from inventory page
    for (const item of items){
      await inventoryPage.addItemToCart(item);
    }
    await inventoryPage.cartIcon.click();

    //Initiate checkout process
    await cartPage.clickCheckout();
    await expect(checkoutPage1.page).toHaveURL(/checkout-step-one/);

    //Fill out checkout form
    await checkoutPage1.enterFirstName('John');
    await checkoutPage1.enterLastName('Doe');
    await checkoutPage1.enterZipcode('90210');

    //Proceed to Overview page
    await checkoutPage1.clickContinue();
    await expect(overviewPage.page).toHaveURL(/checkout-step-two/);

    //Verify items in overview page
    for (const item of items) {
      await overviewPage.verifyItemsToBeCheckedout(item);
    }

    //Complete the order
    await overviewPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});

