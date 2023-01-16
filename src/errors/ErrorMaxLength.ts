import { ID_ERROR_NAME } from '../constants';
import { BaseError } from './BaseError';

function getMessage(limit: number) {
    return `There is only ${limit} characters allowed`;
}

export class ErrorMaxLength extends BaseError {
    constructor(maxLen: number) {
        super();
        this.id = ID_ERROR_NAME;
        this.message = getMessage(maxLen);
    }
}
