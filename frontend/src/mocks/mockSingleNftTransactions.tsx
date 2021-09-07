import { CashIcon, LibraryIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { NftTransactionHistoryInterface } from "../interfaces/nftTransactionHistoryInterface";
/**
 * Mock transactions of single NFT
 */
export const mockSingleNftTransactions: NftTransactionHistoryInterface[] = [
    {
        _id: 1,
        content: '',
        target: 'NFT Minted',
        date: 'Aug 20',
        datetime: '2020-08-20',
        icon: LibraryIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        _id: 2,
        content: 'Sold to',
        target: '0x82S31A @ .5 ETH',
        date: 'Aug 22',
        datetime: '2020-08-22',
        icon: ThumbUpIcon,
        iconBackground: 'bg-green-500',
    },
    {
        _id: 3,
        content: 'Re-Sold from 0x82S31A',
        target: 'to 0x481934 @ 2 ETH',
        date: 'Aug 28',
        datetime: '2020-08-28',
        icon: CashIcon,
        iconBackground: 'bg-yellow-500',
    }
]