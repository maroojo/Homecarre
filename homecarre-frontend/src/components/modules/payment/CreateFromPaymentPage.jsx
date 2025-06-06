"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  message,
  AutoComplete,
} from "antd";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import { hcPayments, hcContacts } from "@homecarre-api";

const { TextArea } = Input;

const CreateFromPaymentPage = () => {
  const [form] = Form.useForm();
  const { createOne, typePayment } = hcPayments;
  const { searchHcNo } = hcContacts;

  const [hcNoOptions, setHcNoOptions] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchHcNo = useMemo(
    () =>
      debounce(async (value) => {
        if (!value || value.length < 2) return;
        const response = await searchHcNo(value);
        if (response?.isSuccess) {
          setHcNoOptions(response.data.map((hc_no) => ({ value: hc_no })));
        }
      }, 200),
    []
  );

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      ...values,
      due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
      payment_month: dayjs(values.payment_month).format("YYYY-MM"),
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
        payment_month: dayjs(),
      }}
    >
      <Form.Item
        label="Homecarre No. (HC No.)"
        name="hc_no"
        rules={[{ required: true, message: "please input Homecarre No." }]}
      >
        <AutoComplete
          options={hcNoOptions}
          onSearch={handleSearchHcNo}
          placeholder="exam : HC-000114"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="amount"
        name="rent_price"
        rules={[{ required: true, message: "Specify Amount" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Due Date"
        name="due_date"
        rules={[{ required: true, message: "please select due date" }]}
      >
        <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item
        label="for month"
        name="payment_month"
        rules={[{ required: true, message: "please input month" }]}
      >
        <DatePicker
          picker="month"
          format="MM-YYYY"
          style={{ width: "100%" }}
          placeholder="exam : 2025-06"
        />
      </Form.Item>

      <Form.Item
        label="Payment Types"
        name="payment_types_id"
        rules={[{ required: true, message: "please select type" }]}
      >
        <Select placeholder="select">
          {paymentTypes.map((type) => (
            <Select.Option key={type.id} value={type.id}>
              {type.type_label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="note" name="payment_note">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Billing
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateFromPaymentPage;
