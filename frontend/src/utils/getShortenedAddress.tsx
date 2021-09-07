/**
 * Convert long address to shortened version that displays first and last 6 characters
 * @param add long address
 * @returns shortened address
 */
export default function getShortenedAddress(add: string): string {
    return `${add.substring(0, 8)}...${add.substring(add.length-6, add.length)}`
}