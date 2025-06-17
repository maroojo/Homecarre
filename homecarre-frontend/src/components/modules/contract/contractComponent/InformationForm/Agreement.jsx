import React from "react";
import { Form, Input, Typography, DatePicker } from "antd";
import { CrBank } from "@homecarre-ui";
const { Title, Text } = Typography;

const AgreementTab = () => {
  const { RangePicker } = DatePicker;
  return (
    <div className="flex flex-col w-1/2">
      <Form.Item label="Lease Term" name={"time"}>
        <Input placeholder="Lease Term" type="number" />
      </Form.Item>
      <Text>month</Text>
      <Form.Item name="dateRange">
        <RangePicker />
      </Form.Item>
      <Form.Item label="Payment Due Date" name={"agreementDatePay"}>
        <Input placeholder="Payment Due Date" type="number" />
      </Form.Item>
      <Form.Item label="Rental Price" name={"rentPrice"}>
        <Input placeholder="Rental Price" type="number" />
      </Form.Item>
      <Form.Item label="Bank" name={"bank"}>
        <CrBank />
      </Form.Item>
      <Form.Item label="Account Name" name={"accountName"}>
        <Input />
      </Form.Item>
      <Form.Item label="Account No." name={"accountNo"}>
        <Input />
      </Form.Item>
    </div>
  );
};

export default AgreementTab;
