import axios from "axios";
import styles from "./FormPage.module.css";
import { useState, useEffect } from "react";
import { validations } from "../../utils/validations";
import ErrorForm from "../ErrorForm/ErrorForm";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions_creators";
import { navigationApiTransition } from "../../utils/navigationApiTransition";
import CloudinaryButton from "../CloudinaryButton/CloudinaryButton";

const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
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

  const [form, setForm] = useState(INITIAL_FORM);
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

  // console.log("FORMULARIO", form);
  // console.log("ERRORS", errors);

  useEffect(() => {
    !types.length && dispatch(getTypes());
  }, [dispatch]);

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

      if (!form.image.startsWith("https://res.cloudinary.com/"))
        form.image =
          "https://pokemonback-u63g.onrender.com/images/whithout_image.webp";
      // form.image = "http://localhost:3001/images/whithout_image.webp";

      axios
        // .post("http://localhost:3001/pokemons", form)
        .post("https://pokemonback-u63g.onrender.com/pokemons", form)
        .catch((error) => setMessageError(error.message))
        .finally(() => {
          setLoading(false);
          setShowMessageStatus(true);
          setTimeout(() => {
            setShowMessageStatus(false);
          }, 4000);
          setShowNotification(true);
        });
      setForm(INITIAL_FORM);
      dispatch(getPokemons());
    }
  };

  const handleImageUrlCloudinary = (urlImageCloudinary) => {
    setForm({
      ...form,
      image: urlImageCloudinary,
    });

    setErrors(
      validations({
        ...form,
        image: urlImageCloudinary,
      })
    );
  };

  const handleChangeType = (evt) => {
    if (evt.target.checked) {
      setForm({
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
      setForm({
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
    setForm({
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
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {showNotification && (
        <Notification
          message={messageError}
          showMessageStatus={showMessageStatus}
        />
      )}

      <h1 style={{ margin: "10px auto" }}>Create Pokemon</h1>
      <button
        style={{ width: "fit-content", margin: "auto", marginBottom: "15px" }}
        disabled={loading}
        className={loading ? styles.blocked : ""}
        onClick={() => navigationApiTransition(navigate, "/home")}
      >
        Back
      </button>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        style={{ viewTransitionName: "form-pok" }}
      >
        <div>
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
              {types.map((t) => (
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
            <div className={styles.errorinputtypes}>
              {errors.types && <ErrorForm formError={errors.types} />}
            </div>
          </div>
        </div>
        <div className={styles.imagecloud}>
          <div>
            <span className={styles.spanimage}>Image:</span>
          </div>
          <div>
            <CloudinaryButton
              imageprev={form.image}
              loading={loading}
              handleImageUrlCloudinary={handleImageUrlCloudinary}
            />
          </div>
          <div className={styles.notivalerror2}>
            {errors.image && <ErrorForm formError={errors.image} />}
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
            type="submit"
            disabled={loading}
            className={loading ? styles.blocked : ""}
          >
            Create Pokemon
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => setForm(INITIAL_FORM)}
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
