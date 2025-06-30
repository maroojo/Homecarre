"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  message,
  AutoComplete,
  Col,
  Row,
  Card,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import { hcPayments, hcContacts, hcPayment } from "@homecarre-api";
import { CeIacHcNo } from "@homecarre-ui";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CreateFromPayment = ({ initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { searchHcNo } = hcContacts;
  const { getPaymentType, createOnePayment } = hcPayment();
  const { success, error } = notification;

  const [hcNoOptions, setHcNoOptions] = useState([]);
  const [selectedHcNo, setSelectedHcNo] = useState(null);

  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    hc_no: initialData?.hc_no || "",
    rent_price: 0,
    due_date: null,
    payment_month: null,
    payment_types_id: null,
    billing_to: "",
    payment_note: "",
  });

  const onValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      ...values,
      due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
      payment_month: dayjs(values.payment_month).format("YYYY-MM"),
    };

    const response = await createOnePayment(payload);
    console.log("response", response);

    if (!response?.isSuccess) {
      error({
        message: "Cannot create billing",
        description: response?.message || "Failed to create billing",
      });
    } else {
      success({
        message: "Billing created successfully",
        description: response?.message || "Billing created successfully",
      });
      form.resetFields();
      setFormData({
        hc_no: initialData?.hc_no || "",
        rent_price: 0,
        due_date: null,
        payment_month: null,
        payment_types_id: null,
        billing_to: "",
        payment_note: "",
      });
    }
    onSuccess?.();
  };

  const loadPaymentTypes = async () => {
    setLoading(true);

    const response = await getPaymentType();
    if (!response?.isSuccess) {
      error({
        message: "Cannot access payment types",
        description: response?.message || "Failed to load payment types",
      });
    }
    setPaymentTypes(response.data);

    setLoading(false);
  };

  useEffect(() => {
    loadPaymentTypes();
    if (initialData) {
      form.setFieldsValue({ hc_no: initialData?.hc_no });
    }
    console.log("data", initialData, initialData.hc_no);
  }, [initialData]);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={{
            hc_no: initialData?.hc_no || "",
            rent_price: 0,
            billing_to: "tenant",
            payment_month: dayjs(),
          }}
        >
          <Form.Item
            label="Homecarre No. (HC No.)"
            name="hc_no"
            validateTrigger={["onBlur"]}
            rules={[{ required: true, message: "please input Homecarre No." }]}
          >
            <CeIacHcNo
              value={form.getFieldValue("hc_no")}
              onSelect={(val) => {
                if (form.getFieldValue("hc_no") !== val) {
                  form.setFieldValue("hc_no", val);
                  setSelectedHcNo(val);
                }
              }}
              onChange={(val) => {
                setSelectedHcNo(null);
              }}
              disabled={!!initialData}
            />
          </Form.Item>

          <Form.Item
            label="amount"
            name="rent_price"
            rules={[{ required: true, message: "Specify Amount" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%", borderRadius: "9999999px" }}
              controls={false}
            />
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
            rules={[{ required: true }]}
          >
            <Select placeholder="select payment type">
              {paymentTypes.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.type_label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Billing To"
            name="billing_to"
            rules={[{ required: true }]}
          >
            <Select placeholder="select payer">
              <Select.Option value="owner">Owner</Select.Option>
              <Select.Option value="tenant">Tenant</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="note" name="payment_note">
            <TextArea
              rows={3}
              maxLength={100}
              showCount
              className="!rounded-2xl !max-h-30"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Billing
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8} className="!ml-20 !mt-5">
        <Card
          title="Billing Preview"
          variant="plain"
          style={{ minHeight: 350, maxWidth: 300 }}
          className="shadow-md shadow-accent"
        >
          <Title level={4}>Billing</Title>

          <p className="flex justify-between mt-4">
            <Text strong>Homecarre No.</Text>
            <Text>{initialData?.hc_no || formData.hc_no || "-"}</Text>
          </p>
          <p className="flex justify-between">
            <Text strong>จำนวนเงิน:</Text>
            <Text>
              {typeof formData.rent_price === "number" &&
              !isNaN(formData.rent_price) &&
              formData.rent_price !== null
                ? formData.rent_price.toLocaleString()
                : "-"}{" "}
              บาท
            </Text>
          </p>
          <p className="flex justify-between">
            <Text strong>วันครบกำหนด:</Text>
            <Text>
              {formData.due_date
                ? dayjs(formData.due_date).format("DD-MM-YYYY")
                : "-"}
            </Text>
          </p>
          <p className="flex justify-between">
            <Text strong>เดือนสำหรับชำระ:</Text>
            <Text>
              {formData.payment_month
                ? dayjs(formData.payment_month).format("MM-YYYY")
                : dayjs().startOf("month").format("MM-YYYY")}
            </Text>
          </p>
          <p className="flex justify-between">
            <Text strong>ประเภทการชำระเงิน:</Text>
            <Text>
              {paymentTypes.find((t) => t.id === formData.payment_types_id)
                ?.type_label || "-"}
            </Text>
          </p>
          <p className="flex justify-between">
            <Text strong>ผู้ชำระ:</Text>
            <Text>{formData.billing_to || "tenant"}</Text>
          </p>
          <p className="flex flex-col">
            <Text strong>หมายเหตุ:</Text>
            <Text>{formData.payment_note || "-"}</Text>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateFromPayment;
