export function weiToEther(wei: string): number {
    const ether = BigInt(wei) / BigInt(10 ** 18);
    return Number(ether);
}
