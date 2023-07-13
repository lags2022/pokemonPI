import axios from "axios";
import { GETPOKEMONS, GETPOKEMONQUERY } from "./actions";

const url = "http://localhost:3001/pokemons";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(url);
      return dispatch({
        type: GETPOKEMONS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPokemonQuery = (query) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${url}/name?pokemon=${query}`);
      return dispatch({
        type: GETPOKEMONQUERY,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: GETPOKEMONQUERY,
        payload: [],
      });
    }
  };
};
