import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { START } from "../../redux/actions";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const { pagination, start } = useSelector((state) => state);
  const dispatch = useDispatch();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (![start, start + 1, start + 2].includes(pagination)) {
      if (pagination < start)
        dispatch({
          type: START,
          payload: pagination,
        });
      else
        dispatch({
          type: START,
          payload: pagination - 2,
        });
    }
  }, [pagination]);

  return (
    <nav className={styles.pagina}>
      <ul style={{ width: "30px" }}>
        {pagination !== 1 && (
          <li>
            <button onClick={() => paginate(pagination - 1)}>&lt;</button>
          </li>
        )}
      </ul>
      <ul>
        {pageNumbers
          .map((number) => (
            <>
              {/* <li
                className={`${styles.showpointsnone} ${
                  number >= 5 &&
                  number === pageNumbers.length - 1 &&
                  styles.showpoints
                }`}
              >
                ···
              </li> */}
              <li
                key={number}
                // className={
                //   (number <= pagination - 2 || number > pagination + 1) &&
                //   // &&
                //   // number <= pageNumbers.length - 1
                //   styles.pagehidden
                // }
              >
                <button
                  className={`${styles.pagebutton} ${
                    pagination === number && styles.currentpagebutton
                  } 
              `}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            </>
          ))
          .slice(start - 1, start + 2)}
      </ul>
      <ul style={{ width: "30px" }}>
        {pagination !== pageNumbers.length && (
          <li>
            <button
              onClick={() => {
                paginate(pagination + 1);
              }}
            >
              &gt;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
