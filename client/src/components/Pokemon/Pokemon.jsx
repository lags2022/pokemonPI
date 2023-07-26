import { Link, useNavigate } from "react-router-dom";
import styles from "./Pokemon.module.css";
import { flushSync } from "react-dom";

const Pokemon = ({ id, name, image, types }) => {
  const navigate = useNavigate();

  return (
    <li className={`${styles.pokemon} fadein`}>
      {/* <Link to={`/detail/${id}`}> */}
      <h2>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h2>
      <div>
        {
          <img
            // className="scale1"
            style={{
              viewTransitionName: `pokemon-${id}`,
              cursor: "pointer",
            }}
            // src={image}
            src={`/gif/${id}.gif`}
            alt={name}
            onClick={(ev) => {
              ev.preventDefault();
              document.startViewTransition(() => {
                flushSync(() => {
                  navigate(`/detail/${id}`);
                });
              });
            }}
          />
        }
      </div>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          textAlign: "center",
          margin: 0,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {types.map((t, i) => (
          <p style={{ left: 0, padding: "10px", margin: 0 }} key={t.i}>
            {t.name}
          </p>
        ))}
      </div>
      {/* </Link> */}
    </li>
  );
};

export default Pokemon;
