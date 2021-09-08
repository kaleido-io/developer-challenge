/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
export const createNFTCollection = /* GraphQL */ `
  mutation CreateNFTCollection(
    $input: CreateNFTCollectionInput!
    $condition: ModelNFTCollectionConditionInput
  ) {
    createNFTCollection(input: $input, condition: $condition) {
      id
    }
  }
`;
export const updateNFTCollection = /* GraphQL */ `
  mutation UpdateNFTCollection(
    $input: UpdateNFTCollectionInput!
    $condition: ModelNFTCollectionConditionInput
  ) {
    updateNFTCollection(input: $input, condition: $condition) {
      name
    }
  }
`;
export const deleteNFTCollection = /* GraphQL */ `
  mutation DeleteNFTCollection(
    $input: DeleteNFTCollectionInput!
    $condition: ModelNFTCollectionConditionInput
  ) {
    deleteNFTCollection(input: $input, condition: $condition) {
      name
    }
  }
`;
export const createNFTToken = /* GraphQL */ `
  mutation CreateNFTToken(
    $input: CreateNFTTokenInput!
    $condition: ModelNFTTokenConditionInput
  ) {
    createNFTToken(input: $input, condition: $condition) {
      name
    }
  }
`;
export const updateNFTToken = /* GraphQL */ `
  mutation UpdateNFTToken(
    $input: UpdateNFTTokenInput!
    $condition: ModelNFTTokenConditionInput
  ) {
    updateNFTToken(input: $input, condition: $condition) {
      name
    }
  }
`;
export const deleteNFTToken = /* GraphQL */ `
  mutation DeleteNFTToken(
    $input: DeleteNFTTokenInput!
    $condition: ModelNFTTokenConditionInput
  ) {
    deleteNFTToken(input: $input, condition: $condition) {
      name
    }
  }
`;
export const createTokenHistory = /* GraphQL */ `
  mutation CreateTokenHistory(
    $input: CreateTokenHistoryInput!
    $condition: ModelTokenHistoryConditionInput
  ) {
    createTokenHistory(input: $input, condition: $condition) {
      updatedAt
    }
  }
`;
export const updateTokenHistory = /* GraphQL */ `
  mutation UpdateTokenHistory(
    $input: UpdateTokenHistoryInput!
    $condition: ModelTokenHistoryConditionInput
  ) {
    updateTokenHistory(input: $input, condition: $condition) {
      updatedAt
    }
  }
`;
export const deleteTokenHistory = /* GraphQL */ `
  mutation DeleteTokenHistory(
    $input: DeleteTokenHistoryInput!
    $condition: ModelTokenHistoryConditionInput
  ) {
    deleteTokenHistory(input: $input, condition: $condition) {
      updatedAt
    }
  }
`;