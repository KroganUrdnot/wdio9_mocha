import type { ClickOptions, WaitForOptions} from 'webdriverio'
import * as assert from "node:assert";
import {Reporter} from "./Reporter.ts";

const DEFAULT_TIME_OUT: number = process.env.DEFAULT_TIME_OUT === undefined ? 60000 : Number(process.env.DEFAULT_TIME_OUT);

export namespace BrowserUtils {

    export async function click(selector: string, options?: ClickOptions): Promise<void> {
        await Reporter.debug(`Click on element '${selector}'`);

        await tryBlock (
            async ()=> await $(selector).click(options),
                `Failed to click on '${selector}'`
        );
    }

    export async function setValue(selector: string, value: string): Promise<void> {
        await Reporter.debug(`Click element '${selector}' with value ${value}`);

        await tryBlock (
            async ()=> await $(selector).setValue(value),
            `Failed to set value : ${value} to '${selector}'`
        );
    }

    export async function waitForDisplayed(selector: string, options?: WaitForOptions): Promise<void> {
        await Reporter.debug(`Wait for element to be visible'${selector}'`);

        await tryBlock (
            async ()=> await $(selector).waitForDisplayed({ ...{timeout: DEFAULT_TIME_OUT}, ...options}),
            `Element not visible '${selector}'`
        );
    }

    async function tryBlock(action: () => Promise<any>, errorMessage: string): Promise<any> {
        try {
            return await action();
        } catch (e: any) {
            handleError(errorMessage, e);
        }
    }

    function handleError(errorMessage: string, error: Error): void {
        assert.fail(`${errorMessage} ${error}`);
    }

}