import { User } from '../../API';
import { ActionType } from '../action-types';
import { Action } from '../actions';
/** Initial blank user state */
const initialState: User = {
    __typename: "User",
    avatar: '',
    description: '',
    ethAddress: '',
    id: '',
    name: '',
    socials: {
        __typename: "Social"
    },
    createdAt: '',
    updatedAt: ''
}
/**
 * Change user state if action type is GET_USER
 * @param state old/new user state
 * @param action action being done on state
 * @returns payload of user if action type is GET_USER
 */
const reducer = (state: User = initialState, action: Action): User => {
    switch (action.type) {
        case ActionType.GET_USER:
            return action.payload
        default:
            return state
    }
}

export default reducer