import { combineReducers } from "redux"
import userReducer from './userReducer'
/**
 * Combine reducers
 */
const reducers = combineReducers({
    user: userReducer
})

export default reducers
export type State = ReturnType<typeof reducers>