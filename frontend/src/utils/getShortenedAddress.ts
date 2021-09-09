/**
 * Convert long string (ex. ETH Address), to shortened version of first 8 and last 6 characters
 * @param add long address
 * @returns shortened address
 */
export const getShortenedAddress = (add: string): string => `${add.substring(0, 8)}...${add.substring(add.length - 6, add.length)}`
