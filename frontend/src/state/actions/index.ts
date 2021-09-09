import { User } from "../../API"
import { ActionType } from "../action-types/index"
/**
 * Action for fetching single user object
 */
interface GetUserAction {
    type: ActionType.GET_USER,
    payload: User
}

export type Action = GetUserAction