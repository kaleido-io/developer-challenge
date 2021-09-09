import { combineReducers } from "redux"
import changeNav from './currentNavReducer'
import sidebarReducer from './sidebarReducer'
import userReducer from './userReducer'
/**
 * Combine reducers
 */
const reducers = combineReducers({
    currentNav: changeNav,
    sideBarOpened: sidebarReducer,
    user: userReducer,
})

export default reducers
export type State = ReturnType<typeof reducers>