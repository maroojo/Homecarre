import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import AdminService from "@/services/Auth/Authentication";
import useNotification from "@/hooks/useNotification";

import ModalTemp from "@/components/ui/overlays/baseModal";

const LoginModal = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { success, warning } = useNotification();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values.username, values.password);

      if (response) {
        setIsOpen(false);
      } else {
        warning({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }
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
    <ModalTemp
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
    </ModalTemp>
  );
};
export default LoginModal;
