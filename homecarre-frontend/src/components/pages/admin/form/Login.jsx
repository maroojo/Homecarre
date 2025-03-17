"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/icon.svg"
        alt="Logo"
        width={100}
        height={100}
        className="mb-10 rounded-full"
      />
      <div className="pb-32 w-full max-w-64">
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
              setLoading={setLoading}
              className="w-full mt-8"
            >
              <div className="w-full h-full">Login</div>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
