import { ErrorIsEmpty, ErrorMaxLength } from '../errors';

const DEFAULT_LENGTH = 50;

export class Validation {
    static isEmpty(value: string) {
        if (!value.trim()) {
            throw new ErrorIsEmpty();
        }
    }

    static hasMaxLenght(value: string, maxLen = DEFAULT_LENGTH) {
        if (value.trim().length > maxLen) {
            throw new ErrorMaxLength(maxLen);
        }
    }
}
