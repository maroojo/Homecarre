"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";

import { hcPayments } from "@homecarre-api";

const { TextArea } = Input;

const CreateFromPaymentPage = () => {
  const [form] = Form.useForm();
  const { createOne, typePayment } = hcPayments;

  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      ...values,
      due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
    };

    const response = await createOne(payload);
    setLoading(false);

    if (response?.isSuccess) {
      message.success("สร้างการชำระเงินสำเร็จ");
      form.resetFields();
    } else {
      message.error(response?.message || "ไม่สามารถสร้างการชำระเงินได้");
    }
  };

  const loadPaymentTypes = async () => {
    setLoading(true);
    try {
      const response = await typePayment();
      if (response?.isSuccess) {
        setPaymentTypes(response.data);
      } else {
        message.error("ไม่สามารถโหลดประเภทการชำระเงินได้");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentTypes();
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        rent_price: 0,
        payment_month: dayjs().format("YYYY-MM"),
      }}
    >
      <Form.Item
        label="รหัสบ้าน (HC No.)"
        name="hc_no"
        rules={[{ required: true, message: "กรุณากรอกรหัสบ้าน" }]}
      >
        <Input placeholder="เช่น HC-000114" />
      </Form.Item>

      <Form.Item
        label="ราคาเช่า"
        name="rent_price"
        rules={[{ required: true, message: "กรุณาระบุราคาเช่า" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="วันที่ครบกำหนด"
        name="due_date"
        rules={[{ required: true, message: "กรุณาเลือกวันที่ครบกำหนด" }]}
      >
        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="เดือนที่ชำระ (รูปแบบ: YYYY-MM)"
        name="payment_month"
        rules={[{ required: true, message: "กรุณาระบุเดือนที่ชำระ" }]}
      >
        <Input placeholder="เช่น 2025-06" />
      </Form.Item>

      <Form.Item
        label="ประเภทการชำระเงิน"
        name="payment_types_id"
        rules={[{ required: true, message: "กรุณาเลือกประเภทการชำระเงิน" }]}
      >
        <Select placeholder="เลือกประเภท">
          {paymentTypes.map((type) => (
            <Select.Option key={type.id} value={type.id}>
              {type.type_label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="หมายเหตุ" name="payment_note">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          สร้างการชำระเงิน
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateFromPaymentPage;
