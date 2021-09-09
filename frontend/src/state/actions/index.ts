import { User } from "../../API"
import { ActionType } from "../action-types/index"
/**
 * Action for fetching single user object
 */
interface GetUserAction {
    type: ActionType.GET_USER,
    payload: User
}
/**
* Action for hiding sidebar
*/
interface HideSidebarAction {
    type: ActionType.HIDE_SIDEBAR
}
/**
* Action for showing sidebar
*/
interface ShowSidebarAction {
    type: ActionType.SHOW_SIDEBAR
}

export type Action = GetUserAction | HideSidebarAction | ShowSidebarAction