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
export const getNFTToken = /* GraphQL */ `
  query GetNFTToken($id: ID!) {
    getNFTToken(id: $id) {
      id
      history {
        items {
          date
          from
          id
          salePrice
          to
          tokenID
          transactionType
          createdAt
          updatedAt
        }
        nextToken
      }
      lastPrice
      name
      createdAt
      updatedAt
    }
  }
`;
export const listNFTTokens = /* GraphQL */ `
  query ListNFTTokens(
    $filter: ModelNFTTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        history {
          nextToken
        }
        lastPrice
        name
        nftCollectionID
        createdAt
        updatedAt
      }
    }
  }
`;
export const getTokenHistory = /* GraphQL */ `
  query GetTokenHistory($id: ID!) {
    getTokenHistory(id: $id) {
      date
      from
      id
      salePrice
      to
      tokenID
      transactionType
      createdAt
      updatedAt
    }
  }
`;
export const listTokenHistories = /* GraphQL */ `
  query ListTokenHistories(
    $filter: ModelTokenHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTokenHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        from
        id
        salePrice
        to
        tokenID
        transactionType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tokensByCollection = /* GraphQL */ `
  query TokensByCollection(
    $nftCollectionID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNFTTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tokensByCollection(
      nftCollectionID: $nftCollectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        history {
          nextToken
        }
        lastPrice
        name
        nftCollectionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const historyByTokenID = /* GraphQL */ `
  query HistoryByTokenID(
    $tokenID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTokenHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyByTokenID(
      tokenID: $tokenID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        from
        id
        salePrice
        to
        tokenID
        transactionType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
