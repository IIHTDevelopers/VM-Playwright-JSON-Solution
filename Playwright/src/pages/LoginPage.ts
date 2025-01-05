import { expect, Locator, Page } from "@playwright/test";
import { PatientSearchHelper } from "../tests/reusableMethod";

import testData from "../Data/loginData.json";
import invalidCredentials from "../Data/invalidLogin.json";

export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;
  private admin: Locator;
  private logOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(`#username_id`);
    this.passwordInput = page.locator(`#password`);
    this.loginButton = page.locator(`#login`);
    this.loginErrorMessage = page.locator(
      `//div[contains(text(),"Invalid credentials !")]`
    );
    this.admin = page.locator('//li[@class="dropdown dropdown-user"]');
    this.logOut = page.locator("//a[text() = ' Log Out ']");
  }

  /**
   * @Test0 This method logs in the user with valid credentials.
   *
   * @description This method performs the login operation using the provided valid credentials. It highlights the input
   *              fields for better visibility during interaction and fills the username and password fields. After submitting
   *              the login form by clicking the login button, it validates the success of the login process. The login is
   *              considered successful if there are no errors.
   *
   * @param {Record<string, string>} loginData - An object containing the login credentials. It includes:
   *                                             - `ValidUserName`: The username used for login.
   *                                             - `ValidPassword`: The password used for login.
   */
  async performLogin() {
    try {
      const loginData = testData.ValidLogin;  // Directly access the login data

      // Highlight and fill the username field
      await PatientSearchHelper.highlightElement(this.usernameInput);
      await this.usernameInput.fill(loginData.ValidUserName);

      // Highlight and fill the password field
      await PatientSearchHelper.highlightElement(this.passwordInput);
      await this.passwordInput.fill(loginData.ValidPassword);

      // Highlight and click the login button
      await PatientSearchHelper.highlightElement(this.loginButton);
      await this.loginButton.click();

      // Verify successful login by checking if 'admin' element is visible
      await this.admin.waitFor({ state: "visible", timeout: 20000 });
      expect(await this.admin.isVisible()).toBeTruthy();
    } catch (e) {
      console.error("Error during login:", e);
    }
  }

  /**
   * @Test15 This method attempts login with invalid credentials and retrieves the resulting error message.
   *
   * @param username - The username to use for the login attempt.
   * @param password - The password to use for the login attempt.
   * @description Tries logging in with incorrect credentials to verify the login error message display.
   *              Highlights each input field and the login button during interaction. Captures and returns
   *              the error message displayed upon failed login attempt.
   */

  async performLoginWithInvalidCredentials() {
    try {
      const InvalidUserName = invalidCredentials.InvalidUserName;
      const InvalidPassword = invalidCredentials.InvalidPassword;

      await this.page.waitForTimeout(2000);
      // Attempt to reset login state by logging out if logged in
      if (await this.admin.isVisible()) {
        await PatientSearchHelper.highlightElement(this.admin);
        await this.admin.click();
        await PatientSearchHelper.highlightElement(this.logOut);
        await this.logOut.click();
      }
      // Highlight and fill username and password fields with invalid credentials
      await PatientSearchHelper.highlightElement(this.usernameInput);
      await this.usernameInput.fill(InvalidUserName);
      await PatientSearchHelper.highlightElement(this.passwordInput);
      await this.passwordInput.fill(InvalidPassword);
      // Highlight and click the login button
      await PatientSearchHelper.highlightElement(this.loginButton);
      await this.loginButton.click();
      expect(await this.loginErrorMessage.isVisible());
    } catch (error) {
      console.error("Error during login with invalid credentials:", error);
      throw new Error(
        "Login failed, and error message could not be retrieved."
      );
    }
  }
}
