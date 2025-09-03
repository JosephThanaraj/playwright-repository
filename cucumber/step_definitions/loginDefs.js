const assert = require('assert');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Import your POM - you'll need to convert it to CommonJS or use dynamic import
Before(async function () {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    //Dynamic import for ES module
    const { LoginPage} = await import ('../../pages/login.page.js');
    this.loginPage = new LoginPage(this.page);
});

After(async function () {
    await this.browser.close();
});

Given('I navigate to the login page', async function () {
    await this.page.goto('https://www.saucedemo.com/');
});

When('I enter username {string}', async function (username) {
    await this.loginPage.enterUsername(username);
});

When('I enter password {string}', async function (password) {
    await this.loginPage.enterPassword(password);
});

When('I click the login button', async function () {
    await this.loginPage.clickLogin();
});

When('I click the login button expecting error', async function () {
    await this.loginPage.clickLoginError();
});

