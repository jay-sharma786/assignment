import { put, call } from "redux-saga/effects";

import { GET_USERS_SUCCESS, GET_USERS_ERROR } from "../constant";
import { getUsersApi } from "../../../lib/api";

const GetUsersSaga = function*() {
  let url = getUsersApi();
  try {
    const response = yield call(fetch, url);
    const data = yield call([response, response.json]);
    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, payload: error });
  }
};

export default GetUsersSaga;
