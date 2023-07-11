import axios from "axios";

export const getDetail = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
