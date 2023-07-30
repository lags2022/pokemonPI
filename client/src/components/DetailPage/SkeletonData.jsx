import styles from "./SkeletonData.module.css";

const SkeletonData = () => {
  return (
    <div className={styles.skdata}>
      {Array(9)
        .fill()
        .map((_, i) => (
          <div key={i} />
        ))}
    </div>
  );
};

export default SkeletonData;
