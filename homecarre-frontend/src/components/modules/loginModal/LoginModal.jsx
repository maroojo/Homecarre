import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import useNotification from "@/hooks/useNotification";

import { OModal } from "@homecarre-ui";

const LoginModal = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { warning } = useNotification();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login({
        user: values.username,
        password: values.password,
      });
    } catch (error) {
      console.error("Login error:", error);
      warning({
        message: "login ผิดพลาดกรุณาลองใหม่",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <OModal
      visible={isOpen}
      onClose={null}
      maskClos={false}
      closable={false}
      iconModal={`/icon.png`}
      blurBackground={true}
    >
      <div className="w-full max-w-64">
        <Form form={form} name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              color="pink"
              variant="solid"
              htmlType="submit"
              loading={loading}
              className="mt-8"
            >
              <div>Login</div>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </OModal>
  );
};
export default LoginModal;
