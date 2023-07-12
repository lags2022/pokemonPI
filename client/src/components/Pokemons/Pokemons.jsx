import styles from "./Pokemons.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions_creators";
import Pagination from "../Pagination/Pagination";
import Pokemon from "../Pokemon/Pokemon";

const Pokemons = () => {
  const dispatch = useDispatch();
  const { pokemonsFilter } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const pokemonsPagination = pokemonsFilter.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={styles.pokemons}>
      {pokemonsPagination.length ? (
        <ul>
          {pokemonsPagination.map((p) => (
            <Pokemon
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              types={p.types}
            />
          ))}
        </ul>
      ) : (
        <img src="/pikachu_squeleton.gif" alt="" />
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemonsFilter.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Pokemons;
