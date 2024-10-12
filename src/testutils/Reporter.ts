import { AllureReporter } from './AllureReporter';
import { ConsoleReport } from './ConsoleReport';

export namespace Reporter {
    export async function closeStep(isFailed: boolean): Promise<void> {
        await AllureReporter.closeStep(isFailed);
    }

    export function setCurrentTestName(testName: string): void {
        ConsoleReport.setCurrentTestName(testName);
    }

    export async function step(msg: string): Promise<void> {
        ConsoleReport.step(msg);
        await AllureReporter.step(msg);
    }

    export async function debug(msg: string): Promise<void> {
        ConsoleReport.debug(msg);
        await AllureReporter.addLogEntry('[DEBUG]', msg);
    }

    export async function warning(msg: string): Promise<void> {
        ConsoleReport.warning(msg);
        await AllureReporter.addLogEntry('[WARNING]', msg);
    }

    export async function error(msg: string): Promise<void> {
        ConsoleReport.error(msg);
        await AllureReporter.addLogEntry('[ERROR]', msg);
    }
}
