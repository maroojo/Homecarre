import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Card,
  DatePicker,
  Typography,
  message,
  Upload,
  Button,
  Spin,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { hcContract } from "@/services";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
const dateFormat = "YYYY-MM-DD";

const Contract = (id) => {
  const [form] = Form.useForm();
  const { getContractById, updateContract } = hcContract();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList,
    onChange(info) {
      let newFileList = [...info.fileList];
      setFileList(newFileList);

      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
  };

  const calculateScheduleDate = (date_pay) => {
    let today = dayjs();
    let scheduleDate;

    if (date_pay >= 1 && date_pay <= 5) {
      let prevMonth = today.subtract(1, "month");
      scheduleDate = prevMonth.date(24 + (date_pay - 1));
      scheduleDate = today.date(date_pay).subtract(5, "day");
    }

    return scheduleDate.date();
  };

  const callContract = async () => {
    try {
      const response = await getContractById(id.id);
      if (response?.data) {
        setData(response.data);
        form.setFieldsValue({
          HCNo: response.data.hc_no,
          propertyCode: response.data.property_code,
          owner: response.data.owner_name,
          tenant: response.data.tenant_name,
          time: response.data.agreement_lease,
          agreementDatePay: response.data.agreement_date_pay,
          rentPrice: response.data.rent_price,
          bank: response.data.bank_name,
          accountName: response.data.account_name,
          accountNo: response.data.bank_no,
          dateRange: [
            dayjs(response.data.date_start, dateFormat),
            dayjs(response.data.date_end, dateFormat),
          ],
        });
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
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
      const response = await updateContract(formData);

      if (response?.isSuccess) {
        message.success("Contract updated successfully");
        setIsEdit(false);
        callContract();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      handleSave();
    }
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    form.resetFields();
    setLoading(true);
    setIsEdit(false);
    setFileList([]);
    if (id) {
      callContract();
    }
  }, [id]);

  return (
    <div className="mx-15 mt-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>Contract</Title>
        <Button
          type="primary"
          icon={isEdit ? <SaveOutlined /> : <EditOutlined />}
          onClick={toggleEdit}
          color={isEdit ? "green" : "blue"}
          variant="solid"
        >
          {isEdit ? "Save" : "Edit"}
        </Button>
      </div>
      <Spin spinning={loading} tip="Loading...">
        <Form
          form={form}
          layout="vertical"
          disabled={!isEdit}
          initialValues={{
            dateRange: [
              data?.date_start ? dayjs(data.date_start, "YYYY-MM-DD") : null,
              data?.date_end ? dayjs(data.date_end, "YYYY-MM-DD") : null,
            ],
          }}
        >
          <Row gutter={[48, 24]}>
            <Col sm={12} xs={24}>
              <div>
                <Title level={4}>Detail</Title>
                <Form.Item label="Homecarre No." name={"HCNo"}>
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Property Code" name={"propertyCode"}>
                  <Input disabled />
                </Form.Item>
                <Card>
                  <Title className="text-left">{data.property_name}</Title>
                  <div className="text-left">
                    <Text>{data.property_detail}</Text>
                  </div>
                </Card>
                <Form.Item label="Owner" name={"owner"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Tenant" name={"tenant"}>
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col sm={12} xs={24}>
              <div>
                <Title level={4}>Agreement</Title>
                <Row align="bottom">
                  <Col span={20}>
                    <Form.Item label="Lease Term" name={"time"}>
                      <Input placeholder="Lease Term" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={4} className="mb-5">
                    <Text>month</Text>
                  </Col>
                </Row>
                <Form.Item name="dateRange">
                  <RangePicker className="w-full mt-5" />
                </Form.Item>
                <Row gutter={[24, 8]}>
                  <Col span={12}>
                    <Form.Item label="Rental Price" name={"rentPrice"}>
                      <Input placeholder="Rental Price" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Payment Due Date"
                      name={"agreementDatePay"}
                    >
                      <Input placeholder="Payment Due Date" type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Title level={4}>Transfer To.</Title>
                <Form.Item label="Bank" name={"bank"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Account Name" name={"accountName"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Account No." name={"accountNo"}>
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
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default Contract;
