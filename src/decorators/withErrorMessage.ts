/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseError } from '../errors';

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

            const errors: BaseError[] = handler();

            if (errors.length) {
                errors.forEach(({ id, message }: BaseError) => {
                    this.prepareError(id);
                    this.errorLabels[id].classList.remove(IS_HIDDEN);
                    this.errorLabels[id].textContent = message;
                });
            }
        }
    };
}
