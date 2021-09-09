/**
 * Convert array of classes to one string
 * @param classes classes to combine into one string
 * @returns single string of class names
 */
export default function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}