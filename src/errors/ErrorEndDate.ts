import { ID_ERROR_DATE } from '../constants';
import { BaseError } from './BaseError';

const MESSAGE = 'The start date excede the end date';

export class ErrorEndDate extends BaseError {
    constructor() {
        super();
        this.id = ID_ERROR_DATE;
        this.message = MESSAGE;
    }
}
