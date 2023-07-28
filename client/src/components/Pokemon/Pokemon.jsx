import { useNavigate } from "react-router-dom";
import styles from "./Pokemon.module.css";
import { flushSync } from "react-dom";
import { useState } from "react";
import SkeletonImage from "../SkeletonImage/SkeletonImage";

const Pokemon = ({ id, name, image, types }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <li className={`${styles.pokemon} fadein`}>
      <h2>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h2>
      <div>
        {!imageLoaded && <SkeletonImage />}
        <img
          loading="lazy"
          style={{
            viewTransitionName: `pokemon-${id}`,
            cursor: "pointer",
          }}
          src={image}
          // src={`/gif/${id}.gif`}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          onClick={(ev) => {
            ev.preventDefault();
            document.startViewTransition(() => {
              flushSync(() => {
                navigate(`/detail/${id}`);
              });
            });
          }}
        />
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
          <p
            style={{ left: 0, padding: "0px 10px 10px 10px", margin: 0 }}
            key={i}
          >
            {t.name}
          </p>
        ))}
      </div>
    </li>
  );
};

export default Pokemon;
