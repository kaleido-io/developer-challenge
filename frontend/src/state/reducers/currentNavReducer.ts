import { ActionType } from '../action-types';
import { Action } from '../actions';
/**
 * Change navigation button GET_CURRENT_NAV
 * @param state old navigation title
 * @param action action being done on state
 * @returns new navigation title string
 */
const reducer = (state = "Home", action: Action): string => {
    switch (action.type) {
        case ActionType.CHANGE_CURRENT_NAV:
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}

export default reducer