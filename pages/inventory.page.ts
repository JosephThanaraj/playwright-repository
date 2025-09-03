import { expect, Page, Locator } from "@playwright/test"

export class InventoryPage {
    private page: Page;
    public cartIcon: Locator;
    private itemSelector: (itemName: string) => Locator;
    private addItemButton: (itemName: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
        this.addItemButton = ( itemName ) => page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    }

    //Method to find item(s)
    async findItem(chosenItem: string): Promise<void> {
        await expect(this.itemSelector(chosenItem)).toBeVisible();
    }

    //Method to click and navigate to item details page
    async clickItem(chosenItem: string): Promise<void> {
        await this.itemSelector(chosenItem).click();
        await expect(this.itemSelector(chosenItem)).toBeVisible();
    }

    //Method to add item(s) to cart
    async addItemToCart(chosenItem: string): Promise<void> {
        await expect(this.addItemButton(chosenItem)).toBeVisible();
        await this.addItemButton(chosenItem).click();
  }

}

