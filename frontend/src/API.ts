/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  avatar: string,
  description: string,
  ethAddress: string,
  id?: string | null,
  name: string,
  socials: SocialInput,
};

export type SocialInput = {
  instagram?: string | null,
  spotify?: string | null,
  twitter?: string | null,
  youtube?: string | null,
};

export type ModelUserConditionInput = {
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  ethAddress?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  avatar: string,
  description: string,
  ethAddress: string,
  id: string,
  name: string,
  socials: Social,
  createdAt: string,
  updatedAt: string,
};

export type Social = {
  __typename: "Social",
  instagram?: string | null,
  spotify?: string | null,
  twitter?: string | null,
  youtube?: string | null,
};

export type UpdateUserInput = {
  avatar?: string | null,
  description?: string | null,
  ethAddress?: string | null,
  id: string,
  name?: string | null,
  socials?: SocialInput | null,
};

export type CreateNFTCollectionInput = {
  id?: string | null,
  description: string,
  imageUrl: string,
  isMinted: boolean,
  name: string,
  totalSold: string,
  totalTokens: string,
};

export type ModelNFTCollectionConditionInput = {
  description?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  isMinted?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  totalSold?: ModelStringInput | null,
  totalTokens?: ModelStringInput | null,
  and?: Array< ModelNFTCollectionConditionInput | null > | null,
  or?: Array< ModelNFTCollectionConditionInput | null > | null,
  not?: ModelNFTCollectionConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type NFTCollection = {
  __typename: "NFTCollection",
  id: string,
  description: string,
  imageUrl: string,
  isMinted: boolean,
  name: string,
  tokens?: ModelNFTTokenConnection | null,
  totalSold: string,
  totalTokens: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelNFTTokenConnection = {
  __typename: "ModelNFTTokenConnection",
  items?:  Array<NFTToken | null > | null,
  nextToken?: string | null,
};

export type NFTToken = {
  __typename: "NFTToken",
  id: string,
  history?: ModelTokenHistoryConnection | null,
  lastPrice: string,
  name: string,
  nftCollection: NFTCollection,
  nftCollectionID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelTokenHistoryConnection = {
  __typename: "ModelTokenHistoryConnection",
  items?:  Array<TokenHistory | null > | null,
  nextToken?: string | null,
};

export type TokenHistory = {
  __typename: "TokenHistory",
  date: string,
  from: string,
  id: string,
  salePrice: string,
  to: string,
  token: NFTToken,
  tokenID: string,
  transactionType: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNFTCollectionInput = {
  id: string,
  description?: string | null,
  imageUrl?: string | null,
  isMinted?: boolean | null,
  name?: string | null,
  totalSold?: string | null,
  totalTokens?: string | null,
};

export type DeleteNFTCollectionInput = {
  id: string,
};

export type CreateNFTTokenInput = {
  id?: string | null,
  lastPrice: string,
  name: string,
  nftCollectionID: string,
};

export type ModelNFTTokenConditionInput = {
  lastPrice?: ModelStringInput | null,
  name?: ModelStringInput | null,
  nftCollectionID?: ModelIDInput | null,
  and?: Array< ModelNFTTokenConditionInput | null > | null,
  or?: Array< ModelNFTTokenConditionInput | null > | null,
  not?: ModelNFTTokenConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateNFTTokenInput = {
  id: string,
  lastPrice?: string | null,
  name?: string | null,
  nftCollectionID?: string | null,
};

export type DeleteNFTTokenInput = {
  id: string,
};

export type CreateTokenHistoryInput = {
  date: string,
  from: string,
  id?: string | null,
  salePrice: string,
  to: string,
  tokenID: string,
  transactionType: string,
};

export type ModelTokenHistoryConditionInput = {
  date?: ModelStringInput | null,
  from?: ModelStringInput | null,
  salePrice?: ModelStringInput | null,
  to?: ModelStringInput | null,
  tokenID?: ModelIDInput | null,
  transactionType?: ModelStringInput | null,
  and?: Array< ModelTokenHistoryConditionInput | null > | null,
  or?: Array< ModelTokenHistoryConditionInput | null > | null,
  not?: ModelTokenHistoryConditionInput | null,
};

export type UpdateTokenHistoryInput = {
  date?: string | null,
  from?: string | null,
  id: string,
  salePrice?: string | null,
  to?: string | null,
  tokenID?: string | null,
  transactionType?: string | null,
};

export type DeleteTokenHistoryInput = {
  id: string,
};

export type ModelUserFilterInput = {
  avatar?: ModelStringInput | null,
  description?: ModelStringInput | null,
  ethAddress?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelNFTCollectionFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  isMinted?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  totalSold?: ModelStringInput | null,
  totalTokens?: ModelStringInput | null,
  and?: Array< ModelNFTCollectionFilterInput | null > | null,
  or?: Array< ModelNFTCollectionFilterInput | null > | null,
  not?: ModelNFTCollectionFilterInput | null,
};

export type ModelNFTCollectionConnection = {
  __typename: "ModelNFTCollectionConnection",
  items?:  Array<NFTCollection | null > | null,
  nextToken?: string | null,
};

export type ModelNFTTokenFilterInput = {
  id?: ModelIDInput | null,
  lastPrice?: ModelStringInput | null,
  name?: ModelStringInput | null,
  nftCollectionID?: ModelIDInput | null,
  and?: Array< ModelNFTTokenFilterInput | null > | null,
  or?: Array< ModelNFTTokenFilterInput | null > | null,
  not?: ModelNFTTokenFilterInput | null,
};

export type ModelTokenHistoryFilterInput = {
  date?: ModelStringInput | null,
  from?: ModelStringInput | null,
  id?: ModelIDInput | null,
  salePrice?: ModelStringInput | null,
  to?: ModelStringInput | null,
  tokenID?: ModelIDInput | null,
  transactionType?: ModelStringInput | null,
  and?: Array< ModelTokenHistoryFilterInput | null > | null,
  or?: Array< ModelTokenHistoryFilterInput | null > | null,
  not?: ModelTokenHistoryFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    avatar: string,
    description: string,
    ethAddress: string,
    id: string,
    name: string,
    socials:  {
      __typename: "Social",
      instagram?: string | null,
      spotify?: string | null,
      twitter?: string | null,
      youtube?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNFTCollectionMutationVariables = {
  input: CreateNFTCollectionInput,
  condition?: ModelNFTCollectionConditionInput | null,
};

export type CreateNFTCollectionMutation = {
  createNFTCollection?:  {
    __typename: "NFTCollection",
    id: string,
    description: string,
    imageUrl: string,
    isMinted: boolean,
    name: string,
    tokens?:  {
      __typename: "ModelNFTTokenConnection",
      items?:  Array< {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    totalSold: string,
    totalTokens: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNFTCollectionMutationVariables = {
  input: UpdateNFTCollectionInput,
  condition?: ModelNFTCollectionConditionInput | null,
};

export type UpdateNFTCollectionMutation = {
  updateNFTCollection?:  {
    __typename: "NFTCollection",
    id: string,
    description: string,
    imageUrl: string,
    isMinted: boolean,
    name: string,
    tokens?:  {
      __typename: "ModelNFTTokenConnection",
      items?:  Array< {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    totalSold: string,
    totalTokens: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNFTCollectionMutationVariables = {
  input: DeleteNFTCollectionInput,
  condition?: ModelNFTCollectionConditionInput | null,
};

export type DeleteNFTCollectionMutation = {
  deleteNFTCollection?:  {
    __typename: "NFTCollection",
    id: string,
    description: string,
    imageUrl: string,
    isMinted: boolean,
    name: string,
    tokens?:  {
      __typename: "ModelNFTTokenConnection",
      items?:  Array< {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    totalSold: string,
    totalTokens: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNFTTokenMutationVariables = {
  input: CreateNFTTokenInput,
  condition?: ModelNFTTokenConditionInput | null,
};

export type CreateNFTTokenMutation = {
  createNFTToken?:  {
    __typename: "NFTToken",
    id: string,
    history?:  {
      __typename: "ModelTokenHistoryConnection",
      items?:  Array< {
        __typename: "TokenHistory",
        date: string,
        from: string,
        id: string,
        salePrice: string,
        to: string,
        tokenID: string,
        transactionType: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastPrice: string,
    name: string,
    nftCollection:  {
      __typename: "NFTCollection",
      id: string,
      description: string,
      imageUrl: string,
      isMinted: boolean,
      name: string,
      tokens?:  {
        __typename: "ModelNFTTokenConnection",
        nextToken?: string | null,
      } | null,
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    },
    nftCollectionID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNFTTokenMutationVariables = {
  input: UpdateNFTTokenInput,
  condition?: ModelNFTTokenConditionInput | null,
};

export type UpdateNFTTokenMutation = {
  updateNFTToken?:  {
    __typename: "NFTToken",
    id: string,
    history?:  {
      __typename: "ModelTokenHistoryConnection",
      items?:  Array< {
        __typename: "TokenHistory",
        date: string,
        from: string,
        id: string,
        salePrice: string,
        to: string,
        tokenID: string,
        transactionType: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastPrice: string,
    name: string,
    nftCollection:  {
      __typename: "NFTCollection",
      id: string,
      description: string,
      imageUrl: string,
      isMinted: boolean,
      name: string,
      tokens?:  {
        __typename: "ModelNFTTokenConnection",
        nextToken?: string | null,
      } | null,
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    },
    nftCollectionID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNFTTokenMutationVariables = {
  input: DeleteNFTTokenInput,
  condition?: ModelNFTTokenConditionInput | null,
};

export type DeleteNFTTokenMutation = {
  deleteNFTToken?:  {
    __typename: "NFTToken",
    id: string,
    history?:  {
      __typename: "ModelTokenHistoryConnection",
      items?:  Array< {
        __typename: "TokenHistory",
        date: string,
        from: string,
        id: string,
        salePrice: string,
        to: string,
        tokenID: string,
        transactionType: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastPrice: string,
    name: string,
    nftCollection:  {
      __typename: "NFTCollection",
      id: string,
      description: string,
      imageUrl: string,
      isMinted: boolean,
      name: string,
      tokens?:  {
        __typename: "ModelNFTTokenConnection",
        nextToken?: string | null,
      } | null,
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    },
    nftCollectionID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTokenHistoryMutationVariables = {
  input: CreateTokenHistoryInput,
  condition?: ModelTokenHistoryConditionInput | null,
};

export type CreateTokenHistoryMutation = {
  createTokenHistory?:  {
    __typename: "TokenHistory",
    date: string,
    from: string,
    id: string,
    salePrice: string,
    to: string,
    token:  {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    },
    tokenID: string,
    transactionType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTokenHistoryMutationVariables = {
  input: UpdateTokenHistoryInput,
  condition?: ModelTokenHistoryConditionInput | null,
};

export type UpdateTokenHistoryMutation = {
  updateTokenHistory?:  {
    __typename: "TokenHistory",
    date: string,
    from: string,
    id: string,
    salePrice: string,
    to: string,
    token:  {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    },
    tokenID: string,
    transactionType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTokenHistoryMutationVariables = {
  input: DeleteTokenHistoryInput,
  condition?: ModelTokenHistoryConditionInput | null,
};

export type DeleteTokenHistoryMutation = {
  deleteTokenHistory?:  {
    __typename: "TokenHistory",
    date: string,
    from: string,
    id: string,
    salePrice: string,
    to: string,
    token:  {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    },
    tokenID: string,
    transactionType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    avatar: string,
    description: string,
    ethAddress: string,
    id: string,
    name: string,
    socials:  {
      __typename: "Social",
      instagram?: string | null,
      spotify?: string | null,
      twitter?: string | null,
      youtube?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetNFTCollectionQueryVariables = {
  id: string,
};

export type GetNFTCollectionQuery = {
  getNFTCollection?:  {
    __typename: "NFTCollection",
    id: string,
    description: string,
    imageUrl: string,
    isMinted: boolean,
    name: string,
    tokens?:  {
      __typename: "ModelNFTTokenConnection",
      items?:  Array< {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    totalSold: string,
    totalTokens: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNFTCollectionsQueryVariables = {
  filter?: ModelNFTCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNFTCollectionsQuery = {
  listNFTCollections?:  {
    __typename: "ModelNFTCollectionConnection",
    items?:  Array< {
      __typename: "NFTCollection",
      id: string,
      description: string,
      imageUrl: string,
      isMinted: boolean,
      name: string,
      tokens?:  {
        __typename: "ModelNFTTokenConnection",
        nextToken?: string | null,
      } | null,
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetNFTTokenQueryVariables = {
  id: string,
};

export type GetNFTTokenQuery = {
  getNFTToken?:  {
    __typename: "NFTToken",
    id: string,
    history?:  {
      __typename: "ModelTokenHistoryConnection",
      items?:  Array< {
        __typename: "TokenHistory",
        date: string,
        from: string,
        id: string,
        salePrice: string,
        to: string,
        tokenID: string,
        transactionType: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    lastPrice: string,
    name: string,
    nftCollection:  {
      __typename: "NFTCollection",
      id: string,
      description: string,
      imageUrl: string,
      isMinted: boolean,
      name: string,
      tokens?:  {
        __typename: "ModelNFTTokenConnection",
        nextToken?: string | null,
      } | null,
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    },
    nftCollectionID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNFTTokensQueryVariables = {
  filter?: ModelNFTTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNFTTokensQuery = {
  listNFTTokens?:  {
    __typename: "ModelNFTTokenConnection",
    items?:  Array< {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTokenHistoryQueryVariables = {
  id: string,
};

export type GetTokenHistoryQuery = {
  getTokenHistory?:  {
    __typename: "TokenHistory",
    date: string,
    from: string,
    id: string,
    salePrice: string,
    to: string,
    token:  {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    },
    tokenID: string,
    transactionType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTokenHistoriesQueryVariables = {
  filter?: ModelTokenHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTokenHistoriesQuery = {
  listTokenHistories?:  {
    __typename: "ModelTokenHistoryConnection",
    items?:  Array< {
      __typename: "TokenHistory",
      date: string,
      from: string,
      id: string,
      salePrice: string,
      to: string,
      token:  {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      },
      tokenID: string,
      transactionType: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type TokensByCollectionQueryVariables = {
  nftCollectionID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNFTTokenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TokensByCollectionQuery = {
  tokensByCollection?:  {
    __typename: "ModelNFTTokenConnection",
    items?:  Array< {
      __typename: "NFTToken",
      id: string,
      history?:  {
        __typename: "ModelTokenHistoryConnection",
        nextToken?: string | null,
      } | null,
      lastPrice: string,
      name: string,
      nftCollection:  {
        __typename: "NFTCollection",
        id: string,
        description: string,
        imageUrl: string,
        isMinted: boolean,
        name: string,
        totalSold: string,
        totalTokens: string,
        createdAt: string,
        updatedAt: string,
      },
      nftCollectionID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type HistoryByTokenIDQueryVariables = {
  tokenID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTokenHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryByTokenIDQuery = {
  historyByTokenID?:  {
    __typename: "ModelTokenHistoryConnection",
    items?:  Array< {
      __typename: "TokenHistory",
      date: string,
      from: string,
      id: string,
      salePrice: string,
      to: string,
      token:  {
        __typename: "NFTToken",
        id: string,
        lastPrice: string,
        name: string,
        nftCollectionID: string,
        createdAt: string,
        updatedAt: string,
      },
      tokenID: string,
      transactionType: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};