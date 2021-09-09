import { ActionType } from "../action-types";
import reducer from "./currentNavReducer";
/**
 * Test currentNavReducer
 */
describe('currentNavReducer()', () => {
  it('should reduce to user data with action type of GET_CURRENT_NAV', () => {
    expect(reducer('Home', { payload: 'Collections', type: ActionType.CHANGE_CURRENT_NAV })).toEqual('Collections')
  })
})