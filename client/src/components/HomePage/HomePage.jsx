import { useNavigate } from "react-router-dom";
import FilterOrder from "../FilterOrder/FilterOrder";
import Pokemons from "../Pokemons/Pokemons";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./HomePage.module.css";
import { navigationApiTransition } from "../../utils/navigationApiTransition";

const HomePage = ({ leaveHomePage }) => {
  const navigate = useNavigate();

  let isViewTransition =
    "😞 Opss, Your browser doesn't support View Transitions API";

  if (document.startViewTransition)
    isViewTransition = "😊 Yess, Your browser support View Transitions API";

  return (
    <>
      <header>
        <div>
          <SearchBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              className="imgtitle"
              src="/titulo_pokemon.webp"
              alt="titulo_pokemon"
              style={{
                viewTransitionName: "titlepok",
              }}
            />
            <small style={{ fontSize: "10px" }}>{isViewTransition}</small>
            {/* <h1 className={styles.prueba}>Pokemon Api</h1> */}
          </div>
          <div>
            <button
              className="fadein"
              onClick={() => navigationApiTransition(navigate, "/form")}
              style={{ viewTransitionName: "form-pok" }}
            >
              Create Pokemon
            </button>
            <button className="fadein" onClick={leaveHomePage}>
              Leave
            </button>
          </div>
        </div>
        <FilterOrder />
      </header>
      <main>
        <Pokemons />
      </main>
    </>
  );
};

export default HomePage;
