import { ActionType } from "../action-types";
import reducer from "./sidebarReducer";
/**
 * Test openSidebar reducer
 */
describe('openSidebar()', () => {
  it('should reduce to true with SHOW_SIDEBAR action - previous state == false', () => {
    expect(reducer(false, { type: ActionType.SHOW_SIDEBAR })).toEqual(true)
  })
  it('should reduce to true with SHOW_SIDEBAR action - previous state == false', () => {
    expect(reducer(true, { type: ActionType.SHOW_SIDEBAR })).toEqual(true)
  })
})
/**
 * Test closeSidebar reducer
 */
describe('closeSidebar()', () => {
  it('should reduce to false with HIDE_SIDEBAR action - previous state == false', () => {
    expect(reducer(false, { type: ActionType.HIDE_SIDEBAR })).toEqual(false)
  })
  it('should reduce to false with HIDE_SIDEBAR action - previous state == false', () => {
    expect(reducer(true, { type: ActionType.HIDE_SIDEBAR })).toEqual(false)
  })
})