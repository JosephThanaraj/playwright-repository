import { expect, Page, Locator } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: "Login"});
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
        await expect(this.page).toHaveURL(/inventory/);
    }

    async clickLoginError(): Promise<void> {
        await this.loginButton.click();
        await expect(this.page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }
}

