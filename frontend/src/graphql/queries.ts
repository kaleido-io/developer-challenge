/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      avatar
      description
      ethAddress
      id
      name
      socials {
        instagram
        spotify
        twitter
        youtube
      }
    }
  }
`;
export const getNFTCollection = /* GraphQL */ `
  query GetNFTCollection($id: ID!) {
    getNFTCollection(id: $id) {
      id
      description
      imageUrl
      isMinted
      name
      totalSold
      totalTokens
      createdAt
      updatedAt
    }
  }
`;
export const listNFTCollections = /* GraphQL */ `
  query ListNFTCollections(
    $filter: ModelNFTCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        imageUrl
        isMinted
        name
        totalSold
        totalTokens
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
