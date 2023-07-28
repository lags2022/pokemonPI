import { filterPokemons } from "../utils/otherFuncReducer";

const INITIAL_VALUES = {
  pokemonsAll: [],
  pokemonsFilter: [],
  pagination: 1,
  pokemonDetail: {},
  types: [],
  start: 1,
};

export const reducer = (state = INITIAL_VALUES, actions) => {
  const ACTIONS = {
    ALL: {
      ...state,
      pokemonsFilter: state.pokemonsAll,
    },

    GETPOKEMONS: {
      ...state,
      pokemonsAll: actions.payload,
      pokemonsFilter: actions.payload,
    },

    GETPOKEMONQUERY: {
      ...state,
      pokemonsFilter: actions.payload,
    },

    GETPOKEMONDETAIL: {
      ...state,
      pokemonDetail: actions.payload,
    },

    GETTYPES: {
      ...state,
      types: actions.payload,
    },

    FILTERPOKEMONS: {
      ...state,
      pokemonsFilter: filterPokemons(state.pokemonsAll, actions.payload),
    },

    GETPAGINATION: {
      ...state,
      pagination: actions.payload,
    },

    START: {
      ...state,
      start: actions.payload,
    },
  };

  return ACTIONS[actions.type] || state;
};
