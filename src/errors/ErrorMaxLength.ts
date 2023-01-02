function getMessage(limit: number) {
    return `There is only ${limit} characters allowed`;
}

export class ErrorMaxLength extends Error {
    constructor(maxLen: number) {
        super(getMessage(maxLen));
        // this.message = MESSAGE;
    }
}
