export function formatDateTime(format: string) {
    const date = new Date();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    const formatted = format
        .replace('YYYY', String(date.getFullYear()))
        .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
        .replace('DD', String(date.getDate()).padStart(2, '0'))
        .replace('hh', String(hours).padStart(2, '0'))
        .replace('mm', String(date.getMinutes()).padStart(2, '0'))
        .replace('ss', String(date.getSeconds()).padStart(2, '0'))
        .replace('A', ampm);

    return formatted;
}
