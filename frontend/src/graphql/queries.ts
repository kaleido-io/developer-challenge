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