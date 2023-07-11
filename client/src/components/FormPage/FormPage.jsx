import { useState, useEffect } from "react";
import { validations } from "../../utils/validations";
import ErrorForm from "../ErrorForm/ErrorForm";
import { getFilter } from "../../actions/getFilter";
import axios from "axios";
import styles from "./FormPage.module.css";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showTypes, setShowTypes] = useState([]);
  const [form, setform] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
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

    axios
      .post("http://localhost:3001/pokemons", form)
      .then(({ data }) => console.log(data));
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
      }}
    >
      <h1 style={{ margin: "10px auto" }}>Create Pokemon</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "10px",
          }}
        >
          <div>
            <div>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>{errors.name && <ErrorForm formError={errors.name} />}</div>
            </div>
            <div>
              <label htmlFor="image">
                Image:
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.image && <ErrorForm formError={errors.image} />}
              </div>
            </div>
            <div>
              <label htmlFor="hp">
                Hp:
                <input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>{errors.hp && <ErrorForm formError={errors.hp} />}</div>
            </div>
            <div>
              <label htmlFor="attack">
                Attack:
                <input
                  type="text"
                  name="attack"
                  value={form.attack}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.attack && <ErrorForm formError={errors.attack} />}
              </div>
            </div>
            <div>
              <label htmlFor="defense">
                Defense:
                <input
                  type="text"
                  name="defense"
                  value={form.defense}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.defense && <ErrorForm formError={errors.defense} />}
              </div>
            </div>
            <div>
              <label htmlFor="speed">
                Speed:
                <input
                  type="text"
                  name="speed"
                  value={form.speed}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.speed && <ErrorForm formError={errors.speed} />}
              </div>
            </div>
            <div>
              <label htmlFor="height">
                Height:
                <input
                  type="text"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.height && <ErrorForm formError={errors.height} />}
              </div>
            </div>
            <div>
              <label htmlFor="weight">
                Weight:
                <input
                  type="text"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <div>
                {errors.weight && <ErrorForm formError={errors.weight} />}
              </div>
            </div>
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
                    onChange={handleChangeType}
                    disabled={loading}
                  />
                </label>
              ))}
            </div>
            <div style={{ display: "relative" }}>
              {errors.types && <ErrorForm formError={errors.types} />}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => navigate("/home")}>
            Back
          </button>
          <button type="submit" disabled={loading}>
            Create Pokemon
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
