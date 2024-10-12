import {BrowserUtils} from "../testutils/BrowserUtils.ts";
import {Reporter} from "../testutils/Reporter.ts";

const nameInput = 'input[name="username"]';
const passwordInput = 'input[name="password"]';
const loginButton = 'input[value="Log In"]';

class LoginPage {
    public async login (username: string, password: string) {
        await Reporter.step('Logging in');
        await this.inputUserName(username);
        await this.inputUserPassword(password);
        await this.clickLogin();
    }

    private async inputUserName(name: string):Promise<void> {
        await Reporter.debug('Insert login name');
        await BrowserUtils.setValue(nameInput, name)
    }

    private async inputUserPassword(password: string):Promise<void> {
        await Reporter.debug('Insert login password');
        await BrowserUtils.setValue(passwordInput, password)
    }

    private async clickLogin():Promise<void> {
        await Reporter.debug('Click login button');
        await BrowserUtils.click(loginButton);
    }
}

export default new LoginPage();
