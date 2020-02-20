import { GET_USERS } from "../constant";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}
