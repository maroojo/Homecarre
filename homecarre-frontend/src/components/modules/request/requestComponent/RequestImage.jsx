import React, { useState } from "react";
import { Modal, Image, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const RequestImage = ({ text, hc_no }) => {
  const [visible, setVisible] = useState(false);

  // รองรับ text ที่เป็น string หรือ array
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
        className="p-4"
        onClick={handlePreview}
      />
      <span className="text-sm text-gray-600">/ {images.length}</span>

      <Modal
        title="Request Images"
        open={visible}
        onCancel={handleClose}
        footer={null}
        width={600}
        centered
        maskClosable={true}
        destroyOnClose
      >
        <div className="w-full flex flex-col gap-4 items-center">
          {images.map((path, idx) => (
            <Image
              key={idx}
              src={`https://www.accomasia.co.th/homecare/public/storage/${path}`}
              alt={`request-img-${idx}`}
              width={550}
              style={{ objectFit: "contain", borderRadius: 8 }}
              placeholder
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default RequestImage;
