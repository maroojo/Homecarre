"use client";

import react, { useState, useRef } from "react";
import { Button, Modal, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { hcPayment } from "@homecarre-api";

const PaymentUpload = ({ paymentNo, onSuccess }) => {
  const { uploadPaymentFile } = hcPayment();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error("File is too large (max 2MB)");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setModalVisible(true);
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !paymentNo) return;

    setUploading(true);
    try {
      const base64 = await toBase64(selectedFile);
      const response = await uploadPaymentFile({
        payment_no: paymentNo,
        image: base64,
      });

      inputRef.current.value = "";

      if (response?.error) {
        message.error(response.error || "Upload failed");
      } else {
        message.success("Upload successful");
        onSuccess?.();
      }
    } catch (err) {
      console.error("Upload error:", err);
      message.error("Upload failed");
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setModalVisible(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <Button
        icon={<UploadOutlined />}
        type="primary"
        onClick={() => inputRef.current?.click()}
      ></Button>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleConfirmUpload}
        okText="Confirm"
        cancelText="Cancel"
        confirmLoading={uploading}
      >
        <p className="mb-2 font-semibold">Confirm upload this slip?</p>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={400}
            height={300}
            className="rounded"
            style={{ maxHeight: 300, objectFit: "contain" }}
          />
        )}
      </Modal>
    </>
  );
};

export default PaymentUpload;
