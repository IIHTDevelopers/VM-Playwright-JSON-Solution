import { Page, expect, Locator } from "@playwright/test";
import { PatientSearchHelper } from "../tests/reusableMethod";

export default class ADTPage {
  readonly page: Page;
  public ADT: {
    ADTLink: Locator;
    searchBar: Locator;
    patientName: Locator;
    hospitalSearchBar: Locator;
    patientCode: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.ADT = {
      ADTLink: page.locator('a[href="#/ADTMain"]'),
      searchBar: page.locator("#quickFilterInput"),
      hospitalSearchBar: page.locator("#id_input_search_using_hospital_no"),
      patientName: page.locator(
        "//div[@role='gridcell' and @col-id='ShortName'][1]"
      ),
      patientCode: page.locator(
        "//div[@role='gridcell' and @col-id='PatientCode'][1]"
      ),
    };
  }

  /**
   * @Test9.3 Executes a patient search in the ADT (Admission, Discharge, Transfer) section using a reusable helper function.
   *
   * @description This method navigates to the ADT section by highlighting and clicking the ADT link,
   *              waits for the page to load, and initiates a patient search using the PatientSearchHelper class.
   *              The function verifies successful navigation to the ADT page and performs the search operation.
   * 
   */

  async searchPatientInADT() {
    const patientSearchHelper = new PatientSearchHelper(this.page);
    await PatientSearchHelper.highlightElement(this.ADT.ADTLink);
    await this.ADT.ADTLink.click();
    await this.page.waitForTimeout(2000);
    await patientSearchHelper.searchPatient();
  }
}
