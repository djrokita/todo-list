import { BaseError, ErrorEndDate, ErrorIsEmpty, ErrorMaxLength } from '../errors';

const DEFAULT_LENGTH = 50;

export class Validation {
    static isEmpty(value: string): BaseError | void {
        if (!value.trim()) {
            return new ErrorIsEmpty();
        }
    }

    static hasMaxLenght(value: string, maxLen = DEFAULT_LENGTH) {
        if (value.trim().length > maxLen) {
            return new ErrorMaxLength(maxLen);
        }
    }

    static idEndDateCorrect(stardDate: string, endDate: string) {
        if (stardDate > endDate) {
            return new ErrorEndDate();
        }
    }
}
