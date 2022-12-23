export function generateID() {
    return (Math.random() * 100).toString(16).replace(/[.]/g, '');
}
