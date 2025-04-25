import React from "react";
import { Modal, Image, Button } from "antd";

const AlertTemp = ({ visible, onClose, iconModal, children }) => {
  return (
    <Modal open={visible} onCancel={onClose} footer={null} maskClosable={true}>
      <div className="flex flex-col justify-center items-center text-center h-full">
        {iconModal && (
          <Image
            src={iconModal}
            alt="Error"
            className="my-5 max-w-40 h-auto flex justify-center"
            preview={false}
          />
        )}
        <div className="text-pretty font-semibold text-xl">{children}</div>
        <div className="flex justify-end gap-4 my-5">
          <Button
            className="py-1 text-primary rounded-full border-primary border-2 cursor-pointer bg-white hover:transform hover:scale-101 hover:ease-in-out"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertTemp;
