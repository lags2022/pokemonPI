import { getFilter } from "../../actions/getFilter";
import { getPokemons } from "../../redux/actions_creators";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FILTERTYPE, ORDER, APIORDB } from "../../redux/actions";
import styles from "./FilterOrder.module.css";

const FilterOrder = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  useEffect(() => {
    getFilter().then((res) => setTypes(res));
  }, []);

  const handleType = (evt) => {
    dispatch({
      type: FILTERTYPE,
      payload: evt.target.value,
    });
  };

  const handleOrder = (evt) => {
    dispatch({
      type: ORDER,
      payload: evt.target.value,
    });
  };

  const handleApiDb = (evt) => {
    dispatch({
      type: APIORDB,
      payload: evt.target.value,
    });
  };

  const arrayOrder = ["AZ", "ZA", "AscAttack", "DescAttack"];

  return (
    <div className={styles.filter}>
      <label htmlFor="types" className="scale1">
        <span>Filter by:</span>
        <div className={styles.select}>
          <select name="types" onChange={handleType}>
            <option value="all"></option>
            {types.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label htmlFor="apiordb" className="scale1">
        <span>Order by:</span>
        <div className={styles.select}>
          <select name="apiordb" onChange={handleApiDb}>
            <option value="all"></option>

            <option value="database">database</option>
            <option value="api">api</option>
          </select>
        </div>
      </label>
      <label htmlFor="order" className="scale1">
        <span>or</span>
        <div className={styles.select}>
          <select name="order" onChange={handleOrder}>
            <option value="all"></option>
            {arrayOrder.map((o, i) => (
              <option key={i} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </label>
      <button className="scale1" onClick={() => dispatch(getPokemons())}>
        All
      </button>
    </div>
  );
};

export default FilterOrder;
