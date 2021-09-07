import { TransactionHistoryInterface } from "../interfaces/transactionHistoryInterface";
/**
 * Mock transactions of user's NFTs
 */
export const mockTransactions: TransactionHistoryInterface[] = [
    {
        "date": "Aug 13, 2021",
        "datetime": "2021-08-13",
        "description": "3/40 of Welcome Home Collection",
        "fromAddress": "0x123456",
        "href": "#",
        "id": "5",
        "profit": "$250",
        "sellValue": "$4,500",
        "toAddress": "0x46204d",
        "type": "Initial Sale"
    },
    {
        "date": "Aug 12, 2021",
        "datetime": "2021-08-12",
        "description": "2/20 of Aries Collection",
        "fromAddress": "0x000000",
        "href": "#",
        "id": "4",
        "profit": "$2,250",
        "sellValue": "$2,500",
        "toAddress": "0x22d454",
        "type": "Initial Sale"
    },
    {
        "date": "Aug 12, 2021",
        "datetime": "2021-08-12",
        "description": "6/40 of Welcome Home Collection",
        "fromAddress": "0xd35h12",
        "href": "#",
        "id": "3",
        "profit": "$50",
        "sellValue": "$1,000",
        "toAddress": "0x894321",
        "type": "Resell"
    },
    {
        "date": "Aug 11, 2021",
        "datetime": "2021-08-11",
        "description": "3/40 of Welcome Home Collection",
        "fromAddress": "0x000000",
        "href": "#",
        "id": "2",
        "profit": "$400",
        "sellValue": "$450",
        "toAddress": "0x123456",
        "type": "Initial Sale"
    },
    {
        "date": "Aug 10, 2021",
        "datetime": "2021-08-10",
        "description": "2/40 of Welcome Home Collection",
        "fromAddress": "0x000000",
        "href": "#",
        "id": "1",
        "profit": "-$50",
        "sellValue": "--",
        "toAddress": "",
        "type": "Minted"
    }
]