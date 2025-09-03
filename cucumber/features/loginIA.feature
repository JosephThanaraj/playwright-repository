Feature: Login into Sauce Demo website
    As a userm I want to login into the Sauce Demo website

    Scenario: Login with valid credentials
        Given I navigate to the Sauce Demo website
        When I enter the username "standard_user"
        And I enter the password "secret_sauce"
        And I click the login button
        Then I should be logged in and see the products page

    Scenario: Login with invalid credentials
        Given I navigate to the Sauce Demo website
        When I enter the username "invalid_user"
        And I enter the password "invalid_password"
        And I click the login button
        Then I should see an error message indicating invalid credentials
