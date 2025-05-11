import React from "react";
import { Form, Input, Typography } from "antd";
const { Title } = Typography;

const UploadTab = () => {
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
