import {BrowserUtils} from "../testutils/BrowserUtils.ts";
import {Reporter} from "../testutils/Reporter.ts";
import {IClientInfo} from "../../test/resourses/clientInfo"

const firstNameInput = 'input[id="customer.firstName"]';
const lastNameInput = 'input[id="customer.lastName"]';
const addressInput = 'input[id="customer.address.street"]';
const cityInput = 'input[id="customer.address.city"]';
const stateInput = 'input[id="customer.address.state"]';
const zipCodeInput = 'input[id="customer.address.zipCode"]';
const phoneInput = 'input[id="customer.phoneNumber"]';
const ssnInput = 'input[id="customer.ssn"]';
const uerNameInput = 'input[id="customer.username"]';
const passwordInput = 'input[id="customer.password"]';
const passwordConfirmInput = 'input[id="repeatedPassword"]';

const startRegisterButton = '//a[text() = "Register"]';
const confirmRegisterButton = 'input[value="Register"]';

const registrationSuccess = '//*[text() = "Your account was created successfully. You are now logged in."]';

class RegistrationPage {

    async registerNewClient(client: IClientInfo) {
        await this.clickRegistration();
        await this.fillRegistrationForm(client);
        await this.clickConfirmRegistration();
        await this.validateRegistrationSuccess();
    }

    private async fillRegistrationForm(client: IClientInfo) {
        await Reporter.step('Filling the registration form');
        await this.inputFirstName(client.firstName);
        await this.inputLastName(client.lastName);
        await this.inputAddress(client.address);
        await this.inputCity(client.city);
        await this.inputState(client.state);
        await this.inputZipCode(client.zipCode);
        await this.inputPhoneNumber(client.phone);
        await this.inputSSN(client.ssn);

        await this.inputUserName(client.userName);
        await this.inputUserPassword(client.userPassword);
        await this.confirmUserPassword(client.userPassword);
    }

    private async inputFirstName(name: string):Promise<void> {
        await Reporter.debug('Insert login name');
        await BrowserUtils.setValue(firstNameInput, name)
    }

    private async inputUserName(name: string):Promise<void> {
        await Reporter.debug('Insert login name');
        await BrowserUtils.setValue(uerNameInput, name)
    }

    private async inputUserPassword(password: string):Promise<void> {
        await Reporter.debug('Insert login password');
        await BrowserUtils.setValue(passwordInput, password)
    }

    private async confirmUserPassword(password: string):Promise<void> {
        await Reporter.debug('Insert login password');
        await BrowserUtils.setValue(passwordConfirmInput, password)
    }

    private async inputLastName(lastName: string): Promise<void> {
        await Reporter.debug('Insert last name');
        await BrowserUtils.setValue(lastNameInput, lastName);
    }

    private async inputAddress(address: string): Promise<void> {
        await Reporter.debug('Insert address');
        await BrowserUtils.setValue(addressInput, address);
    }

    private async inputCity(city: string): Promise<void> {
        await Reporter.debug('Insert city');
        await BrowserUtils.setValue(cityInput, city);
    }

    private async inputState(state: string): Promise<void> {
        await Reporter.debug('Insert state');
        await BrowserUtils.setValue(stateInput, state);
    }

    private async inputZipCode(zipCode: string): Promise<void> {
        await Reporter.debug('Insert zip code');
        await BrowserUtils.setValue(zipCodeInput, zipCode);
    }

    private async inputPhoneNumber(phoneNumber: string): Promise<void> {
        await Reporter.debug('Insert phone number');
        await BrowserUtils.setValue(phoneInput, phoneNumber);
    }

    private async inputSSN(ssn: string): Promise<void> {
        await Reporter.debug('Insert SSN');
        await BrowserUtils.setValue(ssnInput, ssn);
    }

    private async clickRegistration():Promise<void> {
        await Reporter.debug('Click to start registration');
        await BrowserUtils.click(startRegisterButton);
    }

    private async clickConfirmRegistration():Promise<void> {
        await Reporter.debug('Click to confirm registration');
        await BrowserUtils.click(confirmRegisterButton);
    }

    private async validateRegistrationSuccess():Promise<void> {
        await Reporter.debug('Waiting for success notification to appear')
        await BrowserUtils.waitForDisplayed(registrationSuccess);
    }

}

export default new RegistrationPage();
