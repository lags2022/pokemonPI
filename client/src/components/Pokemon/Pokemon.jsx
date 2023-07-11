import { Link } from "react-router-dom";
import styles from "./Pokemon.module.css";

const Pokemon = ({ id, name, image, types }) => {
  return (
    <li className={`${styles.pokemon} scale1`}>
      <Link to={`/detail/${id}`}>
        <h2>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h2>
        <div>
          <img className="scale1" src={image} alt={name} />
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
          {types.map((t) => (
            <p style={{ left: 0, padding: "10px", margin: 0 }} key={t.id}>
              {t.name}
            </p>
          ))}
        </div>
      </Link>
    </li>
  );
};

export default Pokemon;
