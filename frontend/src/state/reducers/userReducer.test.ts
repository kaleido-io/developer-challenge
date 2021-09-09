import { User } from "../../API";
import { ActionType } from "../action-types";
import reducer from "./userReducer";
/**
 * Mock user for testing
 */
export const mockUser: User = {
  __typename: "User",
  avatar: 'linktoAvatar',
  description: 'mockDescription',
  ethAddress: '0x1234567890',
  id: '9e830a58-2ba7-4024-963c-c38575c54749',
  name: 'mockUser',
  socials: {
    __typename: "Social"
  },
  createdAt: '',
  updatedAt: ''
}
/**
 * Test userReducer
 */
describe('userReducer()', () => {
  it('should reduce to user data with action type of GET_USER', () => {
    expect(reducer({} as User, { payload: mockUser, type: ActionType.GET_USER })).toEqual(mockUser)
  })
})