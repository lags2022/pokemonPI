import { order } from "../utils/order";

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

    FILTERTYPE: {
      ...state,
      pokemonsFilter:
        actions.payload !== "all"
          ? state.pokemonsAll.filter((p) =>
              p.types.some((t) => t.name === actions.payload)
            )
          : state.pokemonsAll,
    },

    APIORDB: {
      ...state,
      pokemonsFilter:
        actions.payload !== "all"
          ? state.pokemonsAll.filter((p) =>
              actions.payload === "database" ? p.createDb : !p.createDb
            )
          : state.pokemonsAll,
    },

    ORDER: {
      ...state,
      pokemonsFilter:
        actions.payload !== "all"
          ? [...state.pokemonsAll].sort((a, b) => order(a, b, actions.payload))
          : state.pokemonsAll,
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
