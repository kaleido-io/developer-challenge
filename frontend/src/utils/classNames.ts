/**
 * Convert array of classes to one string
 * @param classes classes to combine into one string
 * @returns single string of class names
 */
export const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ')
