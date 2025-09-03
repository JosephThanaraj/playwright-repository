import { expect, Page, Locator } from '@playwright/test'

export class CartPage {
  public page: Page;
  private itemSelector: (itemName: string) => Locator;
  private checkout: Locator;

  constructor(page: Page){
    this.page = page;
    this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
    this.checkout = page.getByRole('button', {name: 'Checkout'});
  }

  // Helper function to verify items in the cart
  async verifyItemsInCart(item: string): Promise<void> {
    await expect(this.itemSelector(item)).toBeVisible();
  }

  async clickCheckout(): Promise<void> {
    await expect(this.checkout).toBeVisible();
    await this.checkout.click();
  }
}

export class CheckoutPage1 {
  public page: Page;
  private firstName: Locator;
  private lastName: Locator;
  private zip: Locator;
  private continue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zip = page.getByPlaceholder('Zip/Postal Code');
    this.continue = page.getByRole('button', {name: 'Continue'});
  }

  async enterFirstName(firstname: string): Promise<void> {
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(firstname);
  }

  async enterLastName(lastname: string): Promise<void> {
    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(lastname);
  }

  async enterZipcode(zipcode: string): Promise<void> {
    await expect(this.zip).toBeVisible();
    await this.zip.fill(zipcode);
  }

  async clickContinue(): Promise<void> {
    await expect(this.continue).toBeVisible();
    await this.continue.click();
  }
}

export class OverviewPage {
  public page: Page;
  private itemSelector: (itemName: string) => Locator;
  private finish: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
    this.finish = page.getByRole('button', {name: 'Finish'});
  }

  async verifyItemsToBeCheckedout(item: string): Promise<void> {
    await expect(this.itemSelector(item)).toBeVisible();
  }

  async finishCheckout(): Promise<void> {
    await expect(this.finish).toBeVisible();
    await this.finish.click();
  }
}

