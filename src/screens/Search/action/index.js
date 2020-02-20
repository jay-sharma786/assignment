import { GET_PLANETS } from "../constant";

export function getPlanets(planets) {
  return {
    type: GET_PLANETS,
    planets
  };
}
