export function getControl(parent: HTMLElement, index = 0) {
    const element = parent.querySelectorAll('.control')[index];

    return element;
}
