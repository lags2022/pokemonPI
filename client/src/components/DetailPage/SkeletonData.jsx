import styles from "./SkeletonData.module.css";

const SkeletonData = () => {
  return Array(9)
    .fill()
    .map((_, i) => <div key={i} className={styles.skdata} />);
};

export default SkeletonData;
