import { put, call } from "redux-saga/effects";

import { GET_PLANETS_SUCCESS, GET_PLANETS_ERROR } from "../constant";
import { getPlanetsApi } from "../../../lib/api";

function* GetPlanetsSaga() {
  let url = getPlanetsApi();

  try {
    const response = yield call(fetch, url);
    const data = yield call([response, response.json]);

    yield put({ type: GET_PLANETS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_PLANETS_ERROR, payload: error });
  }
}

export default GetPlanetsSaga;
