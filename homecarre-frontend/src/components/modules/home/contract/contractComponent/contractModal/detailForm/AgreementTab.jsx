import React from "react";
import { Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

const AgreementTab = () => {
  return (
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
          <Form.Item label="Payment Due Date" name={"agreementDatePay"}>
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
    </div>
  );
};

export default AgreementTab;
