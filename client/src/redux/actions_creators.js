import axios from "axios";
import {
  GETPOKEMONS,
  GETPOKEMONQUERY,
  GETPOKEMONDETAIL,
  GETTYPES,
} from "./actions";

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

export const getPokemonDetail = (id) => {
  return async function (dispatch) {
    try {
      if (!id)
        return dispatch({
          type: GETPOKEMONDETAIL,
          payload: {},
        });

      const { data } = await axios.get(`${url}/${id}`);
      return dispatch({
        type: GETPOKEMONDETAIL,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GETTYPES,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
