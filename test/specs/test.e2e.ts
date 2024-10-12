import LandingPage from "../../src/pageobjects/Landing.page.ts";
import RegistrationPage from "../../src/pageobjects/Registration.page.ts";
import {ClientInfo} from "../resourses/clientInfo.ts";

const paraBank = 'https://parabank.parasoft.com/parabank/index.htm';

describe('Register new client', () => {
    it('should fill registration form and validate success', async () => {
        await LandingPage.open(paraBank);
        await RegistrationPage.registerNewClient(ClientInfo);
    })
})
