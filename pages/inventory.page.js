//@ts-check
import { expect } from "@playwright/test"

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.itemSelector = ( itemName ) => page.locator('[data-test="inventory-item-name"]').getByText(`${itemName}`);
        this.addItemButton = ( itemName ) => page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    }

    //Method to find item(s)
    async findItem(chosenItem){
        await expect(this.itemSelector(chosenItem)).toBeVisible();
    }

    //Method to click and navigate to item details page
    async clickItem(chosenItem) {
        await this.itemSelector(chosenItem).click();
        await expect(this.itemSelector(chosenItem)).toBeVisible();
    }

    //Method to add item(s) to cart
    async addItemToCart(chosenItem) {
        await expect(this.addItemButton(chosenItem)).toBeVisible();
        await this.addItemButton(chosenItem).click();
  }

}

export { InventoryPage }