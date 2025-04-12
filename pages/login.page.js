//@ts-check
import { expect } from "@playwright/test";

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: "Login"});
    }

    async enterUsername(username){
        await this.usernameField.fill(username);
    }

    async enterPassword(password){
        await this.passwordField.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
        await expect(this.page).toHaveURL(/inventory/);
    }

    async clickLoginError() {
        await this.loginButton.click();
        await expect(this.page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }
}

export { LoginPage };