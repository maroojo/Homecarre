import { App } from 'antd';

const useNotification = () => {
  const { notification } = App.useApp();

  const info = ({ message, onClose }) => {
    notification.destroy();
    notification.info({
      message: 'Info',
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const warning = ({ message, onClose }) => {
    notification.destroy();
    notification.warning({
      message: 'Warning',
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const success = ({ message, onClose }) => {
    notification.destroy();
    notification.success({
      message: 'Success',
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  const error = ({ message, onClose }) => {
    notification.destroy();
    notification.error({
      message: 'Error',
      description: message,
      pauseOnHover: true,
      onClose: onClose,
    });
  };

  return { success, info, warning, error };
};

export default useNotification;
