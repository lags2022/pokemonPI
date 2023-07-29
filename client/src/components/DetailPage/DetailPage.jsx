import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./DetailPage.module.css";
import { useNavigate } from "react-router-dom";
import SkeletonTitle from "./SkeletonTitle";
import SkeletonData from "./SkeletonData";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonDetail } from "../../redux/actions_creators";
import SkeletonImage from "../SkeletonImage/SkeletonImage";
import { navigationApiTransition } from "../../utils/navigationApiTransition";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemonDetail } = useSelector((state) => state);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
    return () => dispatch(getPokemonDetail());
  }, [id, dispatch]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <button
        style={{
          height: "fit-content",
          margin: "20px",
          position: "absolute",
        }}
        onClick={(ev) => {
          ev.preventDefault();
          navigationApiTransition(navigate, "/home");
        }}
      >
        Back
      </button>
      <div className={styles.detail}>
        <div style={{ width: "135px", height: "47px", textAlign: "center" }}>
          {pokemonDetail.name ? (
            <h4>
              {pokemonDetail.name.slice(0, 1).toUpperCase() +
                pokemonDetail.name.slice(1)}
            </h4>
          ) : (
            <SkeletonTitle />
          )}
        </div>
        <div className={styles.divimg2}>
          <div>
            {!imageLoaded && <SkeletonImage />}
            <img
              loading="lazy"
              src={pokemonDetail.image ? pokemonDetail.image : ""}
              // src={`/gif/${id}.gif`}
              alt={pokemonDetail.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                viewTransitionName: `pokemon-${id}`,
              }}
            />
          </div>
          <div>
            <p>Id: </p>
            <p>Hp: </p>
            <p>Attack: </p>
            <p>Defense: </p>
            <p>Speed: </p>
            <p>Height: </p>
            <p>Weight: </p>
            <p>Types: </p>
          </div>
          {/* <div>
            <div />
          </div> */}
          <div style={{ width: "82px", height: "330px" }}>
            {pokemonDetail.id ? (
              <>
                <p
                  style={{
                    overflow: "hidden",
                    width: "60px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {pokemonDetail.id}
                </p>
                <p>{pokemonDetail.hp}</p>
                <p>{pokemonDetail.attack}</p>
                <p>{pokemonDetail.defense}</p>
                {pokemonDetail.speed && <p>{pokemonDetail.speed}</p>}
                {pokemonDetail.height && <p>{pokemonDetail.height}</p>}
                {pokemonDetail.weight && <p>{pokemonDetail.weight}</p>}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "start",
                    gap: "10px",
                    margin: "10px 10px",
                  }}
                >
                  {pokemonDetail.types?.map((t, i) => (
                    <p key={i}>{t.name}</p>
                  ))}
                </div>
              </>
            ) : (
              <SkeletonData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
