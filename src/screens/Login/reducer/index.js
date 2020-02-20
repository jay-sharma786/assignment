import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from "../constant";

const initialState = { users: [], usersError: [] };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        pending: true,
        users: action
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        pending: false,
        users: action.payload
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: action.payload
      };

    default:
      return state;
  }
}
