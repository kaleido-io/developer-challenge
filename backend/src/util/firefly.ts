import {
    FireFlyContractAPIResponse,
    FireFlyTokenTransferResponse,
} from '@hyperledger/firefly-sdk';

export function getUniqueFromValues(
    data: FireFlyTokenTransferResponse[]
): string[] {
    const uniqueFromValues: Set<string> = new Set();
    data.forEach((item) => {
        item.from && uniqueFromValues.add(item.from);
    });
    return Array.from(uniqueFromValues);
}

export function hasItemWithName(
    array: FireFlyContractAPIResponse[],
    name: string
): boolean {
    return array.some((item) => item.name === name);
}
