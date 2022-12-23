export function create_button(iconName = '') {
    const button = document.createElement('button');
    button.classList.add('button');

    if (iconName) {
        const span = document.createElement('span');
        span.className = 'icon is-medium';
        const iconStyleNames = iconName.split(' ');
        const icon = document.createElement('i');
        icon.classList.add(...iconStyleNames);

        span.append(icon);
        button.append(span);
    }

    return button;
}
