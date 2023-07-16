import { useParams } from "react-router-dom";
import { getDetail } from "../../actions/getDetail";
import { useEffect, useState } from "react";
import styles from "./DetailPage.module.css";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import SkeletonTitle from "./SkeletonTitle";
import SkeletonData from "./SkeletonData";

const DetailPage = () => {
  const [detail, setDetail] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(false);
    getDetail(id).then((res) => setDetail(res));
  }, [id]);

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
          document.startViewTransition(() => {
            flushSync(() => {
              navigate("/home");
            });
          });
        }}
      >
        Back
      </button>
      <div className={styles.detail}>
        <div style={{ width: "135px", height: "47px", textAlign: "center" }}>
          {detail.name ? (
            <h4>
              {detail.name.slice(0, 1).toUpperCase() + detail.name.slice(1)}
            </h4>
          ) : (
            <SkeletonTitle />
          )}
        </div>
        <div className={styles.divimg2}>
          <div>
            <img
              loading="lazy"
              // src={detail.image}
              src={`/gif/${id}.gif`}
              alt={detail.name}
              style={{ viewTransitionName: `pokemon-${id}` }}
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
            {detail.id ? (
              <>
                <p style={{ overflow: "hidden" }}>{detail.id}</p>
                <p>{detail.hp}</p>
                <p>{detail.attack}</p>
                <p>{detail.defense}</p>
                {detail.speed && <p>{detail.speed}</p>}
                {detail.height && <p>{detail.height}</p>}
                {detail.weight && <p>{detail.weight}</p>}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "start",
                    gap: "10px",
                    margin: "10px 10px",
                  }}
                >
                  {detail.types?.map((t) => (
                    <p key={t.id}>{t.name}</p>
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
