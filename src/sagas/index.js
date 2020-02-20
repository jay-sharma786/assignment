import { all, fork } from "redux-saga/effects";

import GetUsersSaga from "../screens/Login/saga";
import GetPlanetsSaga from "../screens/Search/saga";

export default function* root() {
  yield all([fork(GetPlanetsSaga), fork(GetUsersSaga)]);
}
