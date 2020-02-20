import {
  GET_PLANETS,
  GET_PLANETS_SUCCESS,
  GET_PLANETS_ERROR
} from "../constant";

const initialState = { planets: [], planetsError: [] };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return {
        ...state,
        pending: true,
        payload: action
      };
    case GET_PLANETS_SUCCESS:
      return {
        ...state,
        pending: false,
        planets: action.payload
      };
    case GET_PLANETS_ERROR:
      return {
        ...state,
        pending: false,
        planetsError: action.payload
      };
    default:
      return state;
  }
}
