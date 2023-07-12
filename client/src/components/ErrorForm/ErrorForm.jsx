import styles from "./ErrorForm.module.css";

const ErrorForm = ({ formError }) => {
  return <p className={styles.shownotivalerror}>{formError}</p>;
};

export default ErrorForm;
