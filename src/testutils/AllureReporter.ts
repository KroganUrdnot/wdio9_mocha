import allureReporter from '@wdio/allure-reporter';

export enum Status {
    FAILED = 'failed',
    BROKEN = 'broken',
    PASSED = 'passed',
    SKIPPED = 'skipped',
}

class CustomCommand {
    public title: string;
    public bodyLabel: string;
    public body: string;
    constructor(title: string, bodyLabel: string, body: string) {
        this.title = title;
        this.body = `${body}`;
        this.bodyLabel = bodyLabel;
    }
    public appendToBody(msg: string): void {
        this.body += `${msg} \n`;
    }
}

let currentTestName: string = '';

export namespace AllureReporter {
    let isStepClosed: boolean = true;
    let customCommand: CustomCommand;
    let currentStepTitle: string;

    export async function closeStep(isFailed: boolean): Promise<void> {
        if (!isStepClosed) {
            await sendCustomCommand(customCommand, isFailed ? Status.FAILED : Status.PASSED);
            isStepClosed = true;
        }
    }

    export async function step(msg: string): Promise<void> {
        await closeStep(false);

        currentStepTitle = `[STEP] - ${msg}`;
        isStepClosed = false;

        customCommand = new CustomCommand(currentStepTitle, 'more info', '');
        customCommand.appendToBody(prettyMessage('[STEP]', msg));
    }

    export async function debug(msg: string): Promise<void> {
        await addLogEntry('[DEBUG]', msg);
    }

    export async function warning(msg: string): Promise<void> {
        await addLogEntry('[WARNING]', msg);
    }

    export async function error(msg: string): Promise<void> {
        await addLogEntry('[ERROR]', msg);
    }

    export async function addLogEntry(logType: string, msg: string): Promise<void> {
        if (!isStepClosed) {
            customCommand.appendToBody(prettyMessage(logType, msg));
        } else {
            customCommand = new CustomCommand(`${logType} - ${msg}`, 'more info', prettyMessage(logType, msg));
            await sendCustomCommand(customCommand);
        }
    }

    async function sendCustomCommand(command: CustomCommand, stepStatus?: Status): Promise<void> {
        let status: Status = Status.PASSED;

        if (stepStatus !== undefined) {
            status = stepStatus;
        }

        allureReporter.addStep(command.title, {content: command.body}, status);
    }

    function prettyMessage(logLevel: string, msg: string): string {
        const dateString: string = getDate();

        return `${dateString}${currentTestName !== '' ? ` ${currentTestName} ` : ' '}${logLevel} ${msg}`;
    }

    function getDate(): string {
        return new Date()
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
    }
}