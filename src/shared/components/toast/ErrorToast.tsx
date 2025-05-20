import React from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ErrorToast.module.scss";

interface ErrorToastProps {
  message: string;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message }) => {
  return (
    <div className={styles.errorToast}>
      <div className={styles.errorToastIcon}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
          />
        </svg>
      </div>
      <div className={styles.errorToastContent}>
        <div className={styles.errorToastTitle}>Ошибка</div>
        <div className={styles.errorToastMessage}>{message}</div>
      </div>
    </div>
  );
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(<ErrorToast message={message} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: styles.errorToastContainer,
    ...options,
  });
};

// Экспортируем готовый ToastContainer с настройками
export const ErrorToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    toastClassName={styles.errorToastContainer}
  />
);

export default ErrorToast;
