/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorIsEmpty, ErrorMaxLength, ErrorEndDate } from '../errors';

type BaseComponent = new (...args: any[]) => object;

const IS_HIDDEN = 'is-hidden';

export function withErrorMessage<T extends BaseComponent>(constructorFunction: T) {
    return class extends constructorFunction {
        errorLabels?: Record<string, HTMLParagraphElement> = {};

        constructor(..._: any[]) {
            super();
        }

        private prepareError(id: string) {
            if (id in this.errorLabels) return;

            const errorLabel = (<any>this).element?.querySelector(`#${id}`);

            this.errorLabels[id] = errorLabel;
        }

        private resetError() {
            const labels = Object.values(this.errorLabels);

            if (labels.length) {
                Object.values(this.errorLabels).forEach((label: HTMLParagraphElement) => {
                    label.classList.add(IS_HIDDEN);
                    label.textContent = '';
                });
            }
        }

        private validate(handler: () => any[]) {
            this.resetError();

            const errors = handler();

            if (errors) {
                errors.forEach((error: any) => {
                    // this.resetError(error.id);
                    this.prepareError(error.id);
                    this.errorLabels[error.id].classList.remove(IS_HIDDEN);
                    this.errorLabels[error.id].textContent = error.message;
                });
            }
        }
    };
}
