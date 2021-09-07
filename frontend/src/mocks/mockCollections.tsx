import { NFTCollectionInterface } from "../interfaces/nftCollectionInterface";
/**
 * Mock NFT collections for given user
 */
export const mockCollections: NFTCollectionInterface[] =
    [
        {
            "_id": "0",
            "description": "The original Aries coin",
            "imageUrl": "https://pbs.twimg.com/profile_images/1428557768307314693/41N8zBA8_400x400.jpg",
            "name": "Aries Coin",
            "totalSold": "34",
            "totalTokens": "50"
        },
        {
            "_id": "1",
            "description": "The debut album from Aries",
            "imageUrl": "https://images.genius.com/7a9c0318205b62b69560a04bd6f78414.1000x1000x1.png",
            "name": "Welcome Home",
            "totalSold": "16",
            "totalTokens": "25"
        },
        {
            "_id": "2",
            "description": "Kids on Molly - Single Release",
            "imageUrl": "https://i.scdn.co/image/ab67616d0000b2733115799fdc1f723531876a32",
            "name": "Kids on Molly",
            "totalSold": "95",
            "totalTokens": "100"
        },
    ]