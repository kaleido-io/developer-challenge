import { API, graphqlOperation } from 'aws-amplify';
import { Dispatch } from 'redux';
import { User } from '../../API';
import { getUser } from '../../graphql/queries';
import { ActionType } from '../action-types';
/**
 * Fetch user information from the database
 * @param id id of user
 * @returns logged in user information
 */
export const fetchUser: any = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData: any = await API.graphql(graphqlOperation(getUser, { id }))
      const user: User = userData.data.getUser
      dispatch({
        type: ActionType.GET_USER,
        payload: user
      })
    }
    catch (e) {
      console.log(e)
    }
  }
}