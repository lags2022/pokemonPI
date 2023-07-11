import axios from "axios";

export const getFilter = async () => {
  const { data } = await axios.get("http://localhost:3001/types");
  return data
};
