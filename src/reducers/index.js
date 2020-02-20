import { combineReducers } from "redux";

// import usersReducer from './users';
import usersReducer from "../screens/Login/reducer";
import planetsReducer from "../screens/Search/reducer";

export default combineReducers({
  planetsReducer,
  usersReducer
});
