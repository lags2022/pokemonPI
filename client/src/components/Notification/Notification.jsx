import styles from "./Notification.module.css";

const Notification = ({ message, showMessageStatus }) => {
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        width: "100%",
        top: "0",
        left: "0",
      }}
    >
      <div
        className={`${styles.notification} 
        ${
          showMessageStatus
            ? !message
              ? styles.opennok
              : styles.opennerror
            : styles.exitn
        }
          `}
      >
        <p>
          {!message
            ? "🚀 Very good, pokemon created"
            : "❌ Error, the pokemon was not created"}
        </p>
      </div>
    </div>
  );
};

export default Notification;
