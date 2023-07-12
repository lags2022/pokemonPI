import { useState, useEffect } from "react";
import { validations } from "../../utils/validations";
import ErrorForm from "../ErrorForm/ErrorForm";
import { getFilter } from "../../actions/getFilter";
import axios from "axios";
import styles from "./FormPage.module.css";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";

const FormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showTypes, setShowTypes] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [showMessageStatus, setShowMessageStatus] = useState(false);

  const INITIAL_FORM = {
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  };

  const [form, setform] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  useEffect(() => {
    getFilter().then((types) => setShowTypes(types));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      errors;
    if (
      ![name, image, hp, attack, defense, speed, height, weight, types].some(
        Boolean
      ) &&
      form.types.length
    ) {
      setLoading(true);
      axios
        .post("http://localhost:3001/pokemons", form)
        .catch((error) => setMessageError(error.message))
        .finally(() => {
          setLoading(false);
          setShowMessageStatus(true);
          setTimeout(() => {
            setShowMessageStatus(false);
          }, 4000);
          setShowNotification(true);
        });
      setform(INITIAL_FORM);
    }
  };

  const handleChangeType = (evt) => {
    if (evt.target.checked) {
      setform({
        ...form,
        types: [...form.types, evt.target.id],
      });
      setErrors(
        validations({
          ...form,
          types: [...form.types, evt.target.id],
        })
      );
    } else {
      const indexType = form.types.findIndex((t) => t === evt.target.id);
      const typesMod = [...form.types];
      typesMod.splice(indexType, 1);
      setform({
        ...form,
        types: typesMod,
      });
      setErrors(
        validations({
          ...form,
          types: typesMod,
        })
      );
    }
  };

  const handleChange = (evt) => {
    setform({
      ...form,
      [evt.target.name]: evt.target.value,
    });
    setErrors(
      validations({
        ...form,
        [evt.target.name]: evt.target.value,
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: "10px",
        position: "relative",
      }}
    >
      {showNotification && (
        <Notification
          message={messageError}
          showMessageStatus={showMessageStatus}
        />
      )}
      <h1 style={{ margin: "10px auto" }}>Create Pokemon</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "30px",
          }}
        >
          <div className={styles.inputform}>
            <label htmlFor="name">
              <span>Name:</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.name && <ErrorForm formError={errors.name} />}
              </div>
            </label>

            <label htmlFor="image">
              <span>Image:</span>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.image && <ErrorForm formError={errors.image} />}
              </div>
            </label>

            <label htmlFor="hp">
              <span>Hp:</span>
              <input
                type="text"
                name="hp"
                value={form.hp}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.hp && <ErrorForm formError={errors.hp} />}
              </div>
            </label>

            <label htmlFor="attack">
              <span>Attack:</span>
              <input
                type="text"
                name="attack"
                value={form.attack}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.attack && <ErrorForm formError={errors.attack} />}
              </div>
            </label>

            <label htmlFor="defense">
              <span>Defense:</span>
              <input
                type="text"
                name="defense"
                value={form.defense}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.defense && <ErrorForm formError={errors.defense} />}
              </div>
            </label>

            <label htmlFor="speed">
              <span>Speed:</span>
              <input
                type="text"
                name="speed"
                value={form.speed}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.speed && <ErrorForm formError={errors.speed} />}
              </div>
            </label>

            <label htmlFor="height">
              <span>Height:</span>
              <input
                type="text"
                name="height"
                value={form.height}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.height && <ErrorForm formError={errors.height} />}
              </div>
            </label>

            <label htmlFor="weight">
              <span>Weight:</span>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                disabled={loading}
              />
              <div className={styles.notivalerror}>
                {errors.weight && <ErrorForm formError={errors.weight} />}
              </div>
            </label>
          </div>

          <div className={styles.typesform}>
            <p>Types:</p>
            <div>
              {showTypes.map((t) => (
                <label htmlFor={t.name} key={t.id}>
                  {t.name}
                  <input
                    id={t.id}
                    type="checkbox"
                    name={t.name}
                    value={
                      form.types[form.types.findIndex((type) => type === t.id)]
                    }
                    checked={form.types.includes(t.id)}
                    onChange={handleChangeType}
                    disabled={loading}
                  />
                </label>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: "60px" }}>
              {errors.types && <ErrorForm formError={errors.types} />}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <button
            type="button"
            disabled={loading}
            className={loading ? styles.blocked : ""}
            onClick={() => navigate("/home")}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={loading ? styles.blocked : ""}
          >
            Create Pokemon
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => setform(INITIAL_FORM)}
            className={loading ? styles.blocked : ""}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
