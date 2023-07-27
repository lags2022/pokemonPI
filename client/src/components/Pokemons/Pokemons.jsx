import styles from "./Pokemons.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions_creators";
import Pagination from "../Pagination/Pagination";
import Pokemon from "../Pokemon/Pokemon";
import { GETPAGINATION } from "../../redux/actions";

const Pokemons = () => {
  const dispatch = useDispatch();
  const { pokemonsFilter, pagination } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = pagination * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const pokemonsPagination = pokemonsFilter.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    dispatch({
      type: GETPAGINATION,
      payload: pageNumber,
    });
    // setCurrentPage(pageNumber);
  };

  //para reiniciar la paginacion en 1
  // useEffect(() => {
  //   dispatch({
  //     type: GETPAGINATION,
  //     payload: 1,
  //   });
  // }, [pokemonsFilter.length]);

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
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemonsFilter.length}
        paginate={paginate}
      />
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
    </div>
  );
};

export default Pokemons;
