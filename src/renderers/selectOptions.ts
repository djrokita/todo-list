export function getSelectOption(options: Record<string, string>): Array<HTMLOptionElement> {
    return Object.entries(options).map(([value, label]: [string, string]): HTMLOptionElement => {
        const element = document.createElement('option');
        element.value = value;
        element.textContent = label;

        return element;
    });
}
