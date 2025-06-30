import React from "react";
import { Form, Input, Typography, DatePicker } from "antd";
import { CeIsBank } from "@homecarre-ui";
const { Title, Text } = Typography;

const AgreementTab = () => {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD-MM-YYYY";
  return (
    <div className="flex flex-col w-1/2">
      <Text>month</Text>
      <Form.Item name="dateRange">
        <RangePicker
          allowEmpty={[true, true]}
          className="w-full"
          format="DD-MM-YYYY"
        />
      </Form.Item>
      <Form.Item label="Lease Term" name={"time"}>
        <Input placeholder="Lease Term" type="number" />
      </Form.Item>
      <Form.Item label="Payment Due Date" name={"agreementDatePay"}>
        <Input placeholder="Payment Due Date" type="number" />
      </Form.Item>
      <Form.Item label="Rental Price" name={"rentPrice"}>
        <Input placeholder="Rental Price" type="number" />
      </Form.Item>
      <Form.Item label="Bank" name={"bank"}>
        <CeIsBank />
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
