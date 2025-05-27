import React, { useState } from "react";
import { Modal, Image, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const PaymentImage = ({ text }) => {
  const [visible, setVisible] = useState(false);

  let images = [];
  if (Array.isArray(text)) {
    images = text;
  } else if (text) {
    images = [text];
  }

  const handlePreview = (e) => {
    e.stopPropagation();
    setVisible(true);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<EyeOutlined />}
        htmlType="submit"
        className="p-4"
        onClick={handlePreview}
      ></Button>
      {/* <EyeOutlined
        onClick={handlePreview}
        style={{ fontSize: "18px", cursor: "pointer" }}
      /> */}

      <Modal
        title="Payment Slip"
        open={visible}
        onCancel={handleClose}
        footer={null}
        width={460}
        centered
        maskClosable={true}
        destroyOnClose
      >
        {/* <div className="w-full flex flex-col items-center gap-2">
          {images.map((path, idx) => (
            <Image
              key={idx}
              src={`https://www.accomasia.co.th/homecare/public${path}`}
              alt={`slip-${idx}`}
              width={450}
              height={600}
              style={{ objectFit: "fit" }}
              placeholder
            />
          ))}
        </div> */}
        <Image
          src={`https://www.accomasia.co.th/homecare/public${text}`}
          alt="slip preview"
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
};

export default PaymentImage;
