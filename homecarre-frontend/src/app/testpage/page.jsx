import React from "react";
import TestPages from "@/components/modules/test/testPages";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hcContract } from "@homecarre-api";

const TestPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { file, type, hc_NO } = values;
    const formData = new FormData();
    formData.append("file", file.file.originFileObj);
    formData.append("type", type);
    formData.append("hc_NO", hc_NO);

    hcContract
      .uploadFile(formData)
      .then((response) => {
        console.log("File uploaded successfully:", response);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="file"
        label="Upload File"
        valuePropName="file"
        rules={[{ required: true, message: "Please upload a file!" }]}
      >
        <Upload beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="type"
        label="Select Type"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        <Select placeholder="Select a type">
          <Select.Option value="document">Document</Select.Option>
          <Select.Option value="register">Register</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="hc_NO"
        label="HC_NO"
        rules={[{ required: true, message: "Please input HC_NO!" }]}
      >
        <Input placeholder="Enter HC_NO" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestPage;
