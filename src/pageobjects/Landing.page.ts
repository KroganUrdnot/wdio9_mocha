import { browser } from '@wdio/globals'
import {Reporter} from "../testutils/Reporter.ts";

class LandingPage {
    async open (url: string): Promise<void> {
        await Reporter.step(`Open the URL : ${url}`)
        await browser.url(url)
    }
}

export default new LandingPage();
