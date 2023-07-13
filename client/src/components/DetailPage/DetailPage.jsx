import { useParams } from "react-router-dom";
import { getDetail } from "../../actions/getDetail";
import { useEffect, useState } from "react";
import styles from "./DetailPage.module.css";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    getDetail(id)
      .then((res) => setDetail(res))
      .finally(() => setLoading(true));
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
        onClick={() => navigate("/home")}
      >
        Back
      </button>
      <div className={styles.detail}>
        {loading ? (
          <>
            <h4>
              {detail.name &&
                detail.name.slice(0, 1).toUpperCase() + detail.name.slice(1)}
            </h4>
            <div className={styles.divimg2}>
              <div>
                <img loading="lazy" src={detail.image} alt={detail.name} />
              </div>
              <div>
                <p>Hp: </p>
                <p>Attack: </p>
                <p>Defense: </p>
                <p>Speed: </p>
                <p>Height: </p>
                <p>Weight: </p>
                <p>Types: </p>
              </div>
              <div>
                <div />
              </div>
              <div>
                <p>{detail.hp}</p>
                <p>{detail.attack}</p>
                <p>{detail.defense}</p>
                {detail.speed && <p>{detail.speed}</p>}
                {detail.height && <p>{detail.height}</p>}
                {detail.weight && <p>{detail.weight}</p>}
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    gap: "10px",
                    margin: "10px 10px",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {detail.types?.map((t) => (
                    <p key={t.id}>{t.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>hola</h1>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
