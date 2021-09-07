import { SVGProps } from "react";
/**
 * Interface for transaction history of an NFT
 */
export interface NftTransactionHistoryInterface {
    _id: number;
    content: string;
    target: string;
    date: string;
    datetime: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    iconBackground: string;
}
