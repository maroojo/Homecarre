import React from "react";
import { Form, Input, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;

const UploadTab = () => {
  const { Dragger } = Upload;
  const uploadProps = {
    beforeUpload: (file) => {
      console.log("Before Upload:", file);
      setFileList((prevList) => [...prevList, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    onChange: (info) => {
      console.log("File Info:", info);
    },
  };
  return (
    <div>
      <Form.Item>
        <Dragger {...uploadProps}>
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
    </div>
  );
};

export default UploadTab;
