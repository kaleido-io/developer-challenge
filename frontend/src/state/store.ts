import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
/**
 * Create store for app
 */
export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)