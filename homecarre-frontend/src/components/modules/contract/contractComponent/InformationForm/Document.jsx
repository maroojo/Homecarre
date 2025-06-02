"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, message, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { hcDocument } from "@homecarre-api";
import useNotification from "@/hooks/useNotification";

const { Title } = Typography;

const Documents = ({ hcNo }) => {
  const { Dragger } = Upload;
  const { getFiles, uploadFile } = hcDocument;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { success, error, warning } = useNotification();

  const uploadProps = {
    beforeUpload: async (file) => {
      const res = await uploadFile(file, hcNo);

      if (res.isSuccess) {
        success({ message: "อัปโหลดสำเร็จ" });
        loadInitialFiles(); // reload หลังอัปโหลด
      } else {
        error({ message: res.message });
      }

      return false;
    },
    onRemove: (file) => {
      setDocuments((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    onChange: (info) => {
      setDocuments(info.fileList);
    },
  };

  const loadInitialFiles = async () => {
    setLoading(true);
    try {
      const response = await getFiles(hcNo);
      if (response?.isSuccess) {
        console.log("response", response);
        const files = response.data;
        const mappedFiles = files.map((file, index) => ({
          uid: `${index}`,
          name: file.namefile,
          status: "done",
          url: `https://accomasia.co.th/homecare/api/admin/document/file/${file.pathfile}`,
          type: file.typefile,
        }));
        setDocuments(mappedFiles);
      }
    } catch (err) {
      error({
        message: err,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialFiles();
  }, []);
  return (
    <div>
      <Form.Item>
        <Dragger {...uploadProps} fileList={[]}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Upload
        fileList={documents}
        showUploadList={{ showRemoveIcon: false }} // ปิดลบถ้าไม่ต้องการให้ลบ
        disabled // ปิดการอัปโหลดใหม่
      />
    </div>
  );
};

export default Documents;
