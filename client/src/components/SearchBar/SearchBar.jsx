import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonQuery } from "../../redux/actions_creators";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  return (
    <div className={styles.search}>
      <label htmlFor="search">
        <input
          className="fadein"
          type="text"
          name="search"
          onChange={handleChange}
          value={search}
          placeholder="Name..."
        />
      </label>
      <button
        className="fadein"
        onClick={() => dispatch(getPokemonQuery(search))}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
