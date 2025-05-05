import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  AutoComplete,
  DatePicker,
  Typography,
  message,
  Upload,
  Button,
  Spin,
} from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { hcContract } from "@homecarre-api";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
const dateFormat = "YYYY-MM-DD";

const CreateContract = () => {
  const [form] = Form.useForm();
  const { createContract, propertyCode } = hcContract();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);

  const fetchPropertyCodes = async () => {
    setLoading(true);
    try {
      const res = await propertyCode();
      if (Array.isArray(res)) {
        setPropertyOptions(res.map((item) => ({ value: item.property_code })));
      }
    } catch (err) {
      message.error(
        "Failed to load property codes. Please try again later." + err
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    onChange(info) {
      let newFileList = [...info.fileList];
      setFileList(newFileList);

      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    onRemove(file) {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: () => false,
  };

  const calculateScheduleDate = (date_pay) => {
    let today = dayjs();
    if (date_pay >= 1 && date_pay <= 5) {
      return today.date(date_pay).subtract(5, "day").date();
    }
    return today.date();
  };

  const handleSearchProperty = async (value) => {
    if (!value) return;

    try {
      const response = await propertyCode(value);
      if (Array.isArray(response)) {
        setPropertyOptions(
          response.map((item) => ({
            value: item.code,
            label: `${item.code} - ${item.name}`,
          }))
        );
      }
    } catch (err) {
      message.error("Failed to load property codes");
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const formData = new FormData();
      const [startDate, endDate] = values.dateRange || [];

      formData.append("property_code", values.propertyCode);
      formData.append("owner_code", values.ownerCode);
      formData.append("tenant_code", values.tenantCode);
      formData.append("term_of_lease", values.time);
      formData.append("date_start", dayjs(startDate).format(dateFormat));
      formData.append("date_end", dayjs(endDate).format(dateFormat));
      formData.append("rent_price", values.rentPrice);
      formData.append("date_pay", values.agreementDatePay);
      formData.append(
        "schedule_date",
        calculateScheduleDate(values.agreementDatePay)
      );
      formData.append("bank_name", values.bank);
      formData.append("bank_account", values.accountName);
      formData.append("bank_no", values.accountNo);
      formData.append("tenant_fullname", values.tenantName);
      formData.append("tenant_telephone", values.tenantTel);
      formData.append("tenant_email", values.tenantEmail || "");
      formData.append("owner_fullname", values.ownerName);
      formData.append("owner_telephone", values.ownerTel);
      formData.append("owner_email", values.ownerEmail || "");

      fileList.forEach((file) => {
        formData.append("document", file.originFileObj);
      });

      const response = await createContract(formData);
      if (response?.isSuccess) {
        message.success("Contract created successfully");
        form.resetFields();
        setFileList([]);
      } else {
        throw new Error("Create failed");
      }
    } catch (error) {
      message.error(error.message || "Error creating contract");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyCodes();
  }, []);

  return (
    <div className="mx-15 mt-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>Create Contract</Title>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleCreate}>
          Save
        </Button>
      </div>
      <Spin spinning={loading} tip="Creating...">
        <Form form={form} layout="vertical">
          <Row gutter={[48, 24]}>
            <Col sm={12} xs={24}>
              <Title level={4}>Detail</Title>
              <Form.Item
                label="Property Code"
                name="propertyCode"
                rules={[{ required: true }]}
              >
                <AutoComplete
                  options={propertyOptions}
                  placeholder="Select or type property code"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item
                label="Owner Code"
                name="ownerCode"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tenant Code"
                name="tenantCode"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Owner Name" name="ownerName">
                <Input />
              </Form.Item>
              <Form.Item label="Owner Tel" name="ownerTel">
                <Input />
              </Form.Item>
              <Form.Item label="Owner Email" name="ownerEmail">
                <Input />
              </Form.Item>
              <Form.Item label="Tenant Name" name="tenantName">
                <Input />
              </Form.Item>
              <Form.Item label="Tenant Tel" name="tenantTel">
                <Input />
              </Form.Item>
              <Form.Item label="Tenant Email" name="tenantEmail">
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Title level={4}>Agreement</Title>
              <Row align="bottom">
                <Col span={20}>
                  <Form.Item
                    label="Lease Term"
                    name="time"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={4} className="mb-5">
                  <Text>month</Text>
                </Col>
              </Row>
              <Form.Item
                label="Date Range"
                name="dateRange"
                rules={[{ required: true }]}
              >
                <RangePicker className="w-full" />
              </Form.Item>
              <Row gutter={[24, 8]}>
                <Col span={12}>
                  <Form.Item label="Rental Price" name="rentPrice">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Payment Due Date" name="agreementDatePay">
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Title level={4}>Transfer To.</Title>
              <Form.Item label="Bank" name="bank">
                <Input />
              </Form.Item>
              <Form.Item label="Account Name" name="accountName">
                <Input />
              </Form.Item>
              <Form.Item label="Account No." name="accountNo">
                <Input />
              </Form.Item>
              <Form.Item>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for single or multiple uploads. Avoid uploading
                    sensitive data.
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateContract;
