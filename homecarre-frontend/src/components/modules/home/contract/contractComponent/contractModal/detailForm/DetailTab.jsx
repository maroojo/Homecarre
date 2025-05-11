import { Form, Input, Typography } from "antd";
const { Title } = Typography;

const DetailTab = () => (
  <div>
    <Title level={4}>Detail</Title>
    <Form.Item label="Homecarre No." name="HCNo">
      <Input disabled />
    </Form.Item>
    <Form.Item label="Property Code" name="propertyCode">
      <Input disabled />
    </Form.Item>
    <Form.Item label="Owner" name="owner">
      <Input />
    </Form.Item>
    <Form.Item label="Tenant" name="tenant">
      <Input />
    </Form.Item>
  </div>
);

export default DetailTab;
