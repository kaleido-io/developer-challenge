import { ActionType } from '../action-types';
import { Action } from '../actions';
/**
 * Change sidebar open/close state if action type is SHOW_SIDEBAR or HIDE_SIDEBAR
 * @param state previous state of sidebar
 * @param action action being done on sidebar state
 * @returns desired sidebar open state
 */
const reducer = (state = false, action: Action): boolean => {
    switch (action.type) {
        case ActionType.SHOW_SIDEBAR:
            return true
        case ActionType.HIDE_SIDEBAR:
            return false
        default:
            return state
    }
}

export default reducer