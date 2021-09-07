/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      updatedAt
    }
  }
`;
export const createNFTCollection = /* GraphQL */ `
  mutation CreateNFTCollection(
    $input: CreateNFTCollectionInput!
    $condition: ModelNFTCollectionConditionInput
  ) {
    createNFTCollection(input: $input, condition: $condition) {
      name
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
