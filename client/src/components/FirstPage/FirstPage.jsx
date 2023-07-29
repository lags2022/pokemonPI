import styles from "./FirstPage.module.css";

const FirstPage = ({ showHomePage }) => {
  return (
    <div className={styles.fpage}>
      <div>
        <video autoPlay muted loop src="/fpage.webm"></video>
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
    </div>
  );
};

export default FirstPage;
