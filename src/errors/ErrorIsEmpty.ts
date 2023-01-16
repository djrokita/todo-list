import { ID_ERROR_NAME } from '../constants';
import { BaseError } from './BaseError';

const MESSAGE = "Task's name is required";

export class ErrorIsEmpty extends BaseError {
    constructor() {
        super();
        this.id = ID_ERROR_NAME;
        this.message = MESSAGE;
    }
}
