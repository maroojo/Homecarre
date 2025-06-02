import { notification } from "antd";

const useNotification = () => {
  const info = ({ message, onClose }) => {
    // notification.close();
    notification.info({
      message: "Info",
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const warning = ({ message, onClose }) => {
    // notification.close();
    notification.warning({
      message: "Warning",
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const success = ({ message, onClose }) => {
    // notification.close();
    notification.success({
      message: "Success",
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const error = ({ message, onClose }) => {
    notification.error({
      message: "Error",
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  return { success, info, warning, error };
};

export default useNotification;
