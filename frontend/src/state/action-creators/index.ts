import { API, graphqlOperation } from 'aws-amplify';
import { Dispatch } from 'redux';
import { User } from '../../API';
import { getUser } from '../../graphql/queries';
import { ActionType } from '../action-types';
import { Action } from "../actions/index"
/**
 * Change navigation
 * @returns new navigation menu title
 */
export const changeNav = (navTitle: string): ((dispatch: Dispatch<Action>) => void) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      payload: navTitle,
      type: ActionType.CHANGE_CURRENT_NAV
    })
  }
}
/**
 * 
 * Fetch user information from the database
 * @param id id of user
 * @returns logged in user information
 */
export const fetchUser = (id: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const userData: any = await API.graphql(graphqlOperation(getUser, { id }))
      const user: User = userData.data.getUser
      dispatch({
        payload: user,
        type: ActionType.GET_USER
      })
    }
    catch (e) {
      console.log(e)
    }
  }
}
/**
 * Open sidebar
 * @returns desired state of sidebar. True: open; false: closed
 */
export const openSidebar = (): ((dispatch: Dispatch<Action>) => void) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SHOW_SIDEBAR
    })
  }
}
/**
 * Close sidebar
 * @returns desired state of sidebar. True: open; false: closed
 */
export const closeSidebar = (): ((dispatch: Dispatch<Action>) => void) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.HIDE_SIDEBAR,
      payload: false
    })
  }
}