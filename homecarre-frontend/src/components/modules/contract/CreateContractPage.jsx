"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
  Typography,
  Spin,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import useNotification from "@/hooks/useNotification";
import { hcContacts } from "@homecarre-api";
import { hcContractManager } from "@homecarre-api";
import { CeIsBank } from "@homecarre-ui";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateContract = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { createContract } = hcContractManager();
  const { success, error, warning } = useNotification();

  const [removingKeys, setRemovingKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemove = (name) => {
    setRemovingKeys((prev) => [...prev, name]);
    setTimeout(() => {
      remove(name);
      setRemovingKeys((prev) => prev.filter((key) => key !== name));
    }, 300);
  };

  const handleAccountChange = (e) => {
    const rawValue = e.target.value;
    // const cleanedValue = rawValue.replace(/-/g, "");
    const cleanedValue = rawValue.replace(/\D/g, "");
    form.setFieldsValue({ account_no: cleanedValue });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payloadRaw = {
        ...values,
        date_start: values.date_start
          ? values.date_start.format("YYYY-MM-DD")
          : null,
        date_end: values.date_end ? values.date_end.format("YYYY-MM-DD") : null,
      };
      const payload = Object.fromEntries(
        Object.entries(payloadRaw).filter(([_, v]) => v !== undefined)
      );

      const response = await createContract(payload);
      if (response.isSuccess) {
        router.push("/");
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const dateStart = Form.useWatch("date_start", form);
  const dateEnd = Form.useWatch("date_end", form);

  useEffect(() => {
    if (dateStart && dateEnd) {
      const months = dateEnd.diff(dateStart, "month");
      form.setFieldsValue({ agreement_lease: months.toString() });
    }
  }, [dateStart, dateEnd]);

  return (
    <div>
      <Spin spinning={loading} tip="Creating...">
        <Row>
          <Form
            form={form}
            name="propertyForm"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              clients: [
                { fullname: "", client_telephone: "", client_type: "owner" },
                { fullname: "", client_telephone: "", client_type: "tenant" },
              ],
            }}
          >
            <Typography.Title level={4}>Property Info</Typography.Title>
            <Row gutter={16}>
              <Col span={5}>
                <Form.Item name="property_code" label="Property Code">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="property_name"
                  label="Property Name"
                  rules={[
                    { required: true, message: "Please input property name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="type" label="Type">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <Input.TextArea className="!rounded-2xl" />
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title level={4}>Agreement</Typography.Title>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="date_start"
                  label="Start Date"
                  rules={[
                    { required: true, message: "Please select start date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="date_end"
                  label="End Date"
                  rules={[
                    { required: true, message: "Please select end date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="agreement_lease"
                  label="Agreement Lease"
                  rules={[
                    { required: true, message: "Please input agreement lease" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="agreement_date_pay"
                  label="Agreement Pay Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input agreement pay date",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title level={4}>Transfer To</Typography.Title>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item
                  name="rent_price"
                  label="Rent Price"
                  type="numeric"
                  rules={[
                    { required: true, message: "Please input rent price" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  name="bank"
                  label="Bank"
                  rules={[
                    { required: true, message: "Please input bank name" },
                  ]}
                >
                  <CeIsBank dropdownStyle={{ width: "15%" }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  name="account_no"
                  label="Account Number"
                  normalize={(value) => value.replace(/\D/g, "")}
                  rules={[
                    { required: true, message: "Please input account number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="account_name"
                  label="Account Name"
                  rules={[
                    { required: true, message: "Please input account name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Typography.Title level={4}>Clients</Typography.Title>
            <Form.List
              name="clients"
              rules={[
                {
                  validator: async (_, clients) => {
                    if (!clients || clients.length < 1) {
                      return Promise.reject(new Error("At least one client"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const isRemoving = removingKeys.includes(name);
                    return (
                      <div
                        key={key}
                        className={`transition-all duration-300 ease-in-out ${
                          isRemoving
                            ? "opacity-0 -translate-y-4"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="start"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "client_code"]}
                            label="Client Code"
                          >
                            <Input placeholder="Optional" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "fullname"]}
                            label="Full Name"
                            rules={[{ required: true, message: "Required" }]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "client_telephone"]}
                            label="Telephone"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "client_type"]}
                            label="Type"
                            rules={[
                              { required: true, message: "Please select type" },
                            ]}
                          >
                            <Select placeholder="Select client type">
                              <Option value="owner">Owner</Option>
                              <Option value="tenant">Tenant</Option>
                            </Select>
                          </Form.Item>

                          {index >= 2 && (
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{ marginTop: 30 }}
                            />
                          )}
                        </Space>
                      </div>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Client
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Spin>
    </div>
  );
};

export default CreateContract;
