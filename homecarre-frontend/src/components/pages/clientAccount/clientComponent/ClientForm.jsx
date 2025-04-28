import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Card, Button, Modal, Select } from "antd";
import ClientService from "@/services/admin/clientService";
import useNotification from "@/hooks/useNotification";

const ClientForm = ({ id, onClose }) => {
  const [form] = Form.useForm();
  const { updateClient, insertClient } = ClientService();
  const [loading, setLoading] = useState(false);
  const { success } = useNotification();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await updateClient({ ...values, client_code: id });
      } else {
        await insertClient(values);
      }
      success({
        message: "การดำเนินการสำเร็จ!",
        onClose: () => {
          console.log("Success notification closed");
        },
      });
      onClose?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const existingData = {
        client_code: id.client_code,
        fullname: id.fullname,
        client_phone: id.telephone,
        client_type: id.client_type,
      };
      form.setFieldsValue(existingData);
    }
  }, [id, form]);

  return (
    <Card title={id ? "Update Client" : "Create Client"}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Phone"
              name="client_phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Client Type"
              name="client_type"
              rules={[{ required: true, message: "Please select client type" }]}
            >
              <Select style={{ textAlign: "left" }} placeholder="Select">
                <Select.Option value="tenant">Tenant</Select.Option>
                <Select.Option value="owner">Owner</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {id ? (
              <Form.Item label="Client Code" name="client_code">
                <Input disabled />
              </Form.Item>
            ) : (
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Invalid email format" }]}
              >
                <Input />
              </Form.Item>
            )}
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {id ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ClientForm;
