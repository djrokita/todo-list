/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorIsEmpty, ErrorMaxLength } from '../errors';

type BaseComponent = new (...args: any[]) => object;

const IS_HIDDEN = 'is-hidden';

export function withErrorMessage<T extends BaseComponent>(constructorFunction: T) {
    return class extends constructorFunction {
        error?: HTMLParagraphElement | null;

        constructor(..._: any[]) {
            super();
            this.prepareError();
        }

        private prepareError() {
            this.error = (<any>this).element?.querySelector('p');
        }

        private resetError() {
            if (!this.error) return;

            this.error.classList.add(IS_HIDDEN);
            this.error.textContent = '';
        }

        private validate(handler: () => void) {
            this.resetError();

            try {
                handler();
            } catch (error) {
                if (!this.error) return;

                let errorMessage = '';
                this.error.classList.remove(IS_HIDDEN);

                if (error instanceof ErrorIsEmpty || error instanceof ErrorMaxLength) {
                    errorMessage = error.message;
                } else {
                    errorMessage = 'There is some error occured. Please check your input';
                }

                this.error.textContent = errorMessage;
            }
        }
    };
}
