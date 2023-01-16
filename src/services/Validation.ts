import { ID_ERROR_DATE, ID_ERROR_NAME } from '../constants';
import { ErrorEndDate, ErrorIsEmpty, ErrorMaxLength } from '../errors';

const DEFAULT_LENGTH = 50;

export class Validation {
    static isEmpty(value: string) {
        if (!value.trim()) {
            // return new ErrorIsEmpty();
            return {
                id: ID_ERROR_NAME,
                message: "Task's name is required",
            };
        }
    }

    static hasMaxLenght(value: string, maxLen = DEFAULT_LENGTH) {
        if (value.trim().length > maxLen) {
            return {
                id: ID_ERROR_NAME,
                message: `There is only ${10} characters allowed`,
            };
            // return new ErrorMaxLength(maxLen);
        }
    }

    static idEndDateCorrect(stardDate: string, endDate: string) {
        if (stardDate > endDate) {
            return {
                id: ID_ERROR_DATE,
                message: 'The start date excede the end date',
            };
            // return new ErrorEndDate();
        }
    }
}
