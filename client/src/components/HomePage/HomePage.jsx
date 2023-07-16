import { Link } from "react-router-dom";
import FilterOrder from "../FilterOrder/FilterOrder";
import Pokemons from "../Pokemons/Pokemons";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./HomePage.module.css";

const HomePage = ({ leaveHomePage }) => {
  return (
    <>
      <header>
        <h1 className={styles.prueba}>Pokemon Api</h1>
        <div>
          <button className="fadein">
            <Link style={{ color: "white" }} to="/form">
              Create
            </Link>
          </button>
          <SearchBar />
          <button className="fadein" onClick={leaveHomePage}>
            Leave
          </button>
        </div>
      </header>
      <main>
        <FilterOrder />
        <Pokemons />
      </main>
    </>
  );
};

export default HomePage;
