"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Form,
  Input,
  message,
  Typography,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

import { hcContacts } from "@homecarre-api";
import useNotification from "@/hooks/useNotification";
import { Color } from "antd/es/color-picker";

const CoConfirm = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoConfirm),
  { ssr: false }
);

const { Title } = Typography;

const Documents = ({ hcNo }) => {
  const { Dragger } = Upload;
  const { getFiles, uploadFile, deleteFile } = hcContacts;
  const { success, error, warning } = useNotification();
  const [fileToDelete, setFileToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleConfirmDeleteFile = (file) => {
    setFileToDelete(file);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    const res = await deleteFile({
      hcNo: hcNo,
      file: fileToDelete.name,
    });

    if (res.isSuccess) {
      success({ message: "ลบไฟล์สำเร็จ" });
      loadInitialFiles();
    } else {
      error({ message: res.message || "ไม่สามารถลบไฟล์ได้" });
    }

    setOpenModal(false);
    setFileToDelete(null);
  };

  useEffect(() => {
    loadInitialFiles();
  }, []);
  return (
    <div>
      <Form.Item>
        <Dragger {...uploadProps} fileList={[]}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined
              style={{ color: "var(--color-primary-base) !important" }}
            />
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
      <Col span={10}>
        <div>
          {documents.map((file) => (
            <div
              key={file.uid}
              className="flex items-center justify-between mb-2 pl-3 rounded-full hover:bg-primary-50 "
            >
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <div className="flex-1 border-b border-dashed border-accent mx-2"></div>
              <Button
                onClick={() => {
                  setFileToDelete(file);
                  setOpenModal(true);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ))}
        </div>
      </Col>
      <CoConfirm
        visible={openModal}
        onClose={() => setOpenModal(false)}
        closable={true}
        onConfirm={handleDelete}
        confirmText="ลบไฟล์"
        cancelText="ยกเลิก"
        title="ยืนยันการลบไฟล์"
        message={`คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์ "${fileToDelete?.name}"`}
        iconModal="/logoHomeCarre.png"
        width={400}
        maskClosable={true}
      />
    </div>
  );
};

export default Documents;
