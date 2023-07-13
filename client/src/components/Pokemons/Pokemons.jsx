import styles from "./Pokemons.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions_creators";
import Pagination from "../Pagination/Pagination";
import Pokemon from "../Pokemon/Pokemon";

const Pokemons = () => {
  const dispatch = useDispatch();
  const { pokemonsFilter } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const pokemonsPagination = pokemonsFilter.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //para reiniciar la paginacion en 1
  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonsFilter.length]);

  //para hacer el loading con gif pokemon corriendo
  useEffect(() => {
    if (!pokemonsFilter.length) {
      setLoading(true);
      dispatch(getPokemons()).finally(() => setLoading(false));
    }
  }, []);

  //para evitar renderizar el gif pokemon not found al comienzo
  useEffect(() => {
    if (!pokemonsFilter.length) {
      setTimeout(() => {
        setNotfound(true);
      }, 100);
    }
  }, [pokemonsFilter]);

  return (
    <div className={styles.pokemons}>
      {loading ? (
        <>
          <h6 className={styles.searchh6}>Searching pokemons...</h6>
          <img
            src="/pikachu_squeleton.gif"
            alt="pikachu_squeleton"
            style={{ width: "300px" }}
          />
        </>
      ) : pokemonsPagination.length ? (
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
        notfound && (
          <>
            <img
              style={{ width: "300px", margin: "0" }}
              src="/pokemon_notfound.gif"
              alt="pokemon_notfound"
            />
            <h6 className={styles.notfound}>Pokemon not found</h6>
          </>
        )
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
