import React from "react";
import { Modal, Image, Button } from "antd";
import "./modal.css";

const ConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  title = "Confirm",
  message = "Are you sure?",
  iconModal,
  confirmText = "Confirm",
  cancelText = "Cancel",
  closable = false,
  blurBackground = true,
  width = 400,
  maskClosable = true,
}) => {
  return (
    <div>
      {visible && blurBackground && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <Modal
        title={title}
        open={visible}
        onCancel={onClose}
        closable={closable}
        footer={null}
        width={width}
        centered
        destroyOnHidden
        maskClosable={maskClosable}
      >
        <div className="flex flex-col justify-center items-center text-center h-full">
          {iconModal && (
            <Image
              src={iconModal}
              alt="Modal Icon"
              className="my-5 max-w-30 h-auto rounded-full"
              preview={false}
            />
          )}
          <div className="font-semibold text-lg mb-6">{message}</div>

          <div className="flex justify-between px-10 my-6 w-full">
            <Button onClick={onClose} className="capsule-btn">
              {cancelText}
            </Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
//
