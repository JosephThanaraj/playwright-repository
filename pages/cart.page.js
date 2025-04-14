//@ts-check
import { expect } from '@playwright/test'

class CartPage {
  constructor(page){
    this.page = page;
    this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
    this.checkout = page.getByRole('button', {name: 'Checkout'});
  }

  // Helper function to verify items in the cart
  async verifyItemsInCart(item) {
    await expect(this.itemSelector(item)).toBeVisible();
  }

  async clickCheckout() {
    await expect(this.checkout).toBeVisible();
    await this.checkout.click();
  }
}

class CheckoutPage1 {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zip = page.getByPlaceholder('Zip/Postal Code');
    this.continue = page.getByRole('button', {name: 'Continue'});
  }

  async enterFirstName(firstname){
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(firstname);
  }

  async enterLastName(lastname){
    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(lastname);
  }

  async enterZipcode(zipcode){
    await expect(this.zip).toBeVisible();
    await this.zip.fill(zipcode);
  }

  async clickContinue(){
    await expect(this.continue).toBeVisible();
    await this.continue.click();
  }
}

class OverviewPage {
  constructor(page) {
    this.page = page;
    this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
    this.finish = page.getByRole('button', {name: 'Finish'});
  }

  async verifyItemsToBeCheckedout(item) {
    await expect(this.itemSelector(item)).toBeVisible();
  }

  async finishCheckout() {
    await expect(this.finish).toBeVisible();
    await this.finish.click();
  }
}

export { CartPage, CheckoutPage1, OverviewPage }
