function create_control(child: HTMLElement, isExpanded: boolean) {
    const control = document.createElement('div');
    control.className = 'control';

    if (isExpanded) {
        control.classList.add('is-expanded');
    }

    control.append(child);

    return control;
}

export function create_field(children: HTMLElement | Array<HTMLElement>, isExtended = true) {
    const field = document.createElement('div');
    field.className = 'field has-addons';

    if (Array.isArray(children)) {
        children.forEach((child: HTMLElement): void => {
            const control = create_control(child, isExtended);
            field.append(control);
        });

        return field;
    }

    const control = create_control(children, isExtended);
    field.append(control);

    return field;
}
