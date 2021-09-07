/**
 * Interface for an nft collection
 */
export interface NFTCollectionInterface {
    _id: string;
    description: string;
    imageUrl: string;
    name: string;
    totalSold: string;
    totalTokens: string;
}