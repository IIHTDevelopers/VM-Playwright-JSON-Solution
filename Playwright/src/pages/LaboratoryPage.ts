import { Page, Locator } from "playwright";
import { PatientSearchHelper } from "../tests/reusableMethod";
import { expect } from "playwright/test";

export default class LaboratoryPage {
  private page: Page;
  private laboratoryLink: Locator;
  private laboratoryDashboard: Locator;
  private settingsSubModule: Locator;
  private addNewLabTest: Locator;
  private addButton: Locator;
  private closeButton: Locator;
  private starIcon: Locator;
  private errorMessageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.laboratoryLink = page.locator('a[href="#/Lab"]');
    this.laboratoryDashboard = page.locator('a[href="#/Lab/Dashboard"]');
    this.settingsSubModule = page.locator('(//a[@href="#/Lab/Settings"])[2]');
    this.addNewLabTest = page.locator(
      '//a[contains(text(),"Add New Lab Test")]'
    );
    this.addButton = page.locator('//button[contains(text(),"Add")]');
    this.closeButton = page.locator('//button[contains(text(),"Close")]');
    this.starIcon = page.locator('i[title="Remember this Date"]');
    this.errorMessageLocator = page.locator(`//p[contains(text(),"error")]/../p[contains(text(),"Lab Test Code Required.")]`);
  }

  /**
   * @Test5 This method verifies the error message when attempting to add a new lab test without entering required values.
   *
   * @description Navigates to Laboratory > Settings, selects "Add New Lab Test," and clicks the Add button without
   *              providing any input. Captures and returns the displayed error message.
   * @Note Do not close "Add Lab Test" Modal
   */
  async verifyErrorMessage() {
    let errorMessageText = "";
    // Navigate to Laboratory > Settings
    await PatientSearchHelper.highlightElement(this.laboratoryLink);
    await this.laboratoryLink.click();

    await PatientSearchHelper.highlightElement(this.settingsSubModule);
    await this.settingsSubModule.click();

    // Click on Add New Lab Test
    await PatientSearchHelper.highlightElement(this.addNewLabTest);
    await this.addNewLabTest.click();

    // Click on Add button without entering any values
    await PatientSearchHelper.highlightElement(this.addButton);
    await this.addButton.click();

    // Capture the error message text
    const errorLocator = this.errorMessageLocator;
    await expect(errorLocator).toBeVisible();
    errorMessageText = (await errorLocator.textContent()) || "";
    console.log(`Error message text: ${errorMessageText}`);
  }

  /**
   * @Test12 This method verifies the tooltip text of the star icon in the laboratory dashboard.
   *
   * @description This function navigates to the laboratory page and dashboard, hovers over the star icon, and
   *              waits for the tooltip to appear. It verifies the visibility of the star icon and retrieves the tooltip
   *              text. 
   */

  async verifyStarTooltip() {
    let tooltipText = "";
    await PatientSearchHelper.highlightElement(this.laboratoryLink);
    await this.laboratoryLink.click();

    await PatientSearchHelper.highlightElement(this.laboratoryDashboard);
    await this.laboratoryDashboard.click();

    await this.starIcon.hover();

    // Wait for the tooltip to appear and verify its visibility
    await expect(this.starIcon).toBeVisible();

    // Get the tooltip text
    tooltipText = (await this.starIcon.getAttribute("title")) || "";
    console.log(`Tooltip text: ${tooltipText}`);
  }
}
