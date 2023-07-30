import { getTypes } from "../../redux/actions_creators";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GETPAGINATION, ALL, FILTERPOKEMONS } from "../../redux/actions";
import styles from "./FilterOrder.module.css";

const FilterOrder = () => {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);

  const INITIAL_FILTER = {
    type: "",
    apiordb: "",
    order: "",
  };

  const [filter, setFilter] = useState(INITIAL_FILTER);

  useEffect(() => {
    !types.length && dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (evt) => {
    setFilter({
      ...filter,
      [evt.target.name]: evt.target.value,
    });
  };

  const arrayOrder = ["AZ", "ZA", "AscAttack", "DescAttack"];

  return (
    <div className={styles.filter}>
      <label htmlFor="type" className="fadein">
        <span>Filter by:</span>
        <div className={styles.select}>
          <select name="type" onChange={handleFilter}>
            <option value=""></option>
            {types.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label htmlFor="apiordb" className="fadein">
        <span>Order by:</span>
        <div className={styles.select}>
          <select name="apiordb" onChange={handleFilter}>
            <option value=""></option>
            <option value="database">database</option>
            <option value="api">api</option>
          </select>
        </div>
      </label>
      <label htmlFor="order" className="fadein">
        <span>or</span>
        <div className={styles.select}>
          <select name="order" onChange={handleFilter}>
            <option value=""></option>
            {arrayOrder.map((o, i) => (
              <option key={i} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          className="fadein"
          onClick={() => {
            const { type, apiordb, order } = filter;
            if ([type, apiordb, order].some(Boolean)) {
              dispatch({
                type: GETPAGINATION,
                payload: 1,
              });
              dispatch({
                type: FILTERPOKEMONS,
                payload: filter,
              });
            }
          }}
        >
          Show
        </button>
        <button
          className="fadein"
          onClick={() => {
            dispatch({
              type: GETPAGINATION,
              payload: 1,
            });
            dispatch({
              type: ALL,
            });
          }}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default FilterOrder;
