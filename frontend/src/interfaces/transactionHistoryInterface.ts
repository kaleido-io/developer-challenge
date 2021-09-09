/**
 * Interface for displaying recent token transactions
 */
export interface TransactionHistoryInterface {
    date: string;
    datetime: string;
    description: string;
    fromAddress: string;
    href: string;
    id: string;
    profit: string;
    sellValue: string;
    toAddress: string;
    type: 'Initial Sale' | 'Minted' | 'Resell'
}