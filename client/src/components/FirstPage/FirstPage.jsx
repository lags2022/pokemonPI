import styles from "./FirstPage.module.css";

const FirstPage = ({ showHomePage }) => {
  return (
    <div className={styles.fpage}>
      <div className={styles.contimg}></div>
      <div className={styles.bfpage}>
        <img
          className="imgtitle"
          src="/titulo_pokemon.webp"
          alt="titulo_pokemon"
          style={{
            viewTransitionName: "titlepok",
          }}
        />
        <button onClick={showHomePage}>Go to Pokemon Api</button>
      </div>
    </div>
  );
};

export default FirstPage;
