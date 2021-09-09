import { combineReducers } from "redux"
import sidebarReducer from './sidebarReducer'
import userReducer from './userReducer'
/**
 * Combine reducers
 */
const reducers = combineReducers({
    user: userReducer,
    sideBarOpened: sidebarReducer
})

export default reducers
export type State = ReturnType<typeof reducers>