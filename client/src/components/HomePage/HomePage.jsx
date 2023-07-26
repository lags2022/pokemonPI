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
          <Link style={{ color: "white" }} to="/form">
            <button className="fadein">Create Pokemon</button>
          </Link>
          <SearchBar />
          <FilterOrder />
          <button className="fadein" onClick={leaveHomePage}>
            Leave
          </button>
        </div>
      </header>
      <main>
        <Pokemons />
      </main>
    </>
  );
};

export default HomePage;
