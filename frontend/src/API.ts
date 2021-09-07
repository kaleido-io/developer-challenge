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
