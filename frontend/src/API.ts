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
  totalSold: string,
  totalTokens: string,
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
    totalSold: string,
    totalTokens: string,
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
      totalSold: string,
      totalTokens: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};