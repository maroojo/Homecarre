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
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { hcContractManager } from "@homecarre-api";
import { CeIsBank, CeIacClient, CeIsPropertyTypes } from "@homecarre-ui";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateContract = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { createContract } = hcContractManager();

  const [select, setSelect] = useState({});
  const [create, setCreate] = useState({});
  const [removingKeys, setRemovingKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const dateFormat = "DD-MM-YYYY";

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
            <div className="bg-background px-8 rounded-2xl pt-5">
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
                    <CeIsPropertyTypes />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={5}>
                  <Form.Item name="unit" label="unit / house No.">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={19}>
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
                    <DatePicker style={{ width: "100%" }} format={dateFormat} />
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
                    <DatePicker style={{ width: "100%" }} format={dateFormat} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="agreement_lease"
                    label="Agreement Lease"
                    rules={[
                      {
                        required: true,
                        message: "Please input agreement lease",
                      },
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
                    <InputNumber
                      min={0}
                      style={{ width: "100%", borderRadius: "9999999px" }}
                      controls={false}
                    />
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
                      {
                        required: true,
                        message: "Please input account number",
                      },
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
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        const isRemoving = removingKeys.includes(name);

                        const handleRemove = (name) => {
                          setRemovingKeys((prev) => [...prev, name]);

                          setTimeout(() => {
                            remove(name);

                            setSelect((prev) => {
                              const { [name]: _, ...rest } = prev;
                              return rest;
                            });
                            setCreate((prev) => {
                              const { [name]: _, ...rest } = prev;
                              return rest;
                            });

                            setRemovingKeys((prev) =>
                              prev.filter((key) => key !== name)
                            );
                          }, 300);
                        };

                        const toggleCreate = (val) => {
                          setCreate((prev) => ({
                            ...prev,
                            [name]: val,
                          }));
                          setSelect((prev) => ({
                            ...prev,
                            [name]: val,
                          }));
                        };

                        return (
                          <div
                            key={key}
                            className={`transition-all duration-300 ease-in-out relative ${
                              isRemoving
                                ? "opacity-0 translate-x-4"
                                : "opacity-100 translate-x-0"
                            }`}
                          >
                            <div className="flex flex-wrap gap-1 items-start justify-between">
                              {create[name] && (
                                <div
                                  className={`transition-all duration-600 ease-in-out mt-6 visible absolute left-0 cursor-pointer z-10`}
                                >
                                  <Button
                                    type="default"
                                    onClick={() => toggleCreate(false)}
                                  >
                                    Search
                                  </Button>
                                </div>
                              )}
                              <div
                                className={`flex content-center text-base font-medium text-state-ignore mt-6 z-10 ${
                                  create[name]
                                    ? "visible absolute left-18"
                                    : "opacity-0 right-30 translate-x-4 absolute"
                                }`}
                              >
                                or Create
                              </div>
                              <Form.Item
                                {...restField}
                                name={[name, "client_code"]}
                                label="Search Client"
                                className={`transition-all duration-600 ease-in-out ${
                                  create[name]
                                    ? "max-w-[75%] opacity-0 -translate-x-4"
                                    : "w-2/3 opacity-100 translate-x-0"
                                } `}
                              >
                                <CeIacClient
                                  value={form.getFieldValue([
                                    "clients",
                                    name,
                                    "client_code",
                                  ])}
                                  onSelect={(item, list) => {
                                    const client = list?.item?.client;
                                    setSelect((prev) => ({
                                      ...prev,
                                      [name]: true,
                                    }));
                                    setCreate((prev) => ({
                                      ...prev,
                                      [name]: true,
                                    }));
                                    form.setFields([
                                      {
                                        name: ["clients", name, "client_code"],
                                        value: item,
                                      },
                                      {
                                        name: ["clients", name, "fullname"],
                                        value: client.fullname,
                                      },
                                      {
                                        name: [
                                          "clients",
                                          name,
                                          "client_telephone",
                                        ],
                                        value: client.telephone,
                                      },
                                    ]);
                                  }}
                                  selectFromList
                                />
                              </Form.Item>
                              <div
                                className={`flex content-center text-base font-light text-state-ignore mt-6 ${
                                  create[name]
                                    ? "opacity-0 right-30 translate-x-4 absolute"
                                    : "visible absolute right-30"
                                }`}
                              >
                                or
                              </div>
                              <div
                                className={`transition-all duration-600 ease-in-out mt-6 ml-5 z-10 ${
                                  create[name]
                                    ? "opacity-0 right-0 -translate-x-4 absolute"
                                    : "visible absolute right-0"
                                }`}
                              >
                                <Button
                                  onClick={() => toggleCreate(true)}
                                  icon={<PlusOutlined />}
                                >
                                  New
                                </Button>
                              </div>

                              <Form.Item
                                {...restField}
                                name={[name, "fullname"]}
                                label="Full Name"
                                rules={[
                                  { required: true, message: "Required" },
                                ]}
                                className={`transition-all duration-600 ease-in-out w-4/12 ${
                                  select[name]
                                    ? "opacity-100 "
                                    : "opacity-0 pointer-events-none absolute"
                                }`}
                              >
                                <Input />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "client_telephone"]}
                                label="Telephone"
                                className={`transition-all duration-600 ease-in-out w-2/12
                                ${
                                  select[name]
                                    ? "opacity-100 "
                                    : "opacity-0 pointer-events-none absolute"
                                }`}
                              >
                                <Input />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "client_type"]}
                                label="Type"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select type",
                                  },
                                ]}
                                className={`transition-all duration-600 ease-in-out w-2/12 
                                ${
                                  select[name]
                                    ? "opacity-100 z-15"
                                    : "opacity-0 pointer-events-none absolute right-0"
                                }`}
                              >
                                <Select placeholder="Select client type">
                                  <Option value="owner">Owner</Option>
                                  <Option value="tenant">Tenant</Option>
                                </Select>
                              </Form.Item>

                              {index >= 2 && (
                                <div className="absolute -right-15 text-state-danger">
                                  <div className="group relative mt-4 ml-4 flex items-center p-1 bg-background rounded-r-full">
                                    <MinusCircleOutlined
                                      onClick={() => {
                                        handleRemove(name);
                                      }}
                                      className="text-xl text-state-danger p-2 transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <span className="absolute left-full ml-2 text-state-danger text-sm font-light opacity-0 translate-x-[-20px] group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                      Remove
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div className="mb-5 flex justify-center">
                        <Form.Item className="w-1/3">
                          <Button
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            className=" !bg-state-warning !text-text-w"
                          >
                            Add Client
                          </Button>
                        </Form.Item>
                      </div>
                    </>
                  );
                }}
              </Form.List>
            </div>
            <div className="flex justify-end">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-56 !h-10">
                  Create Homecarre
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Row>
      </Spin>
    </div>
  );
};

export default CreateContract;
