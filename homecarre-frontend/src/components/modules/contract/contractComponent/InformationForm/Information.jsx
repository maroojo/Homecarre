import { Form, Input } from "antd";

const DetailTab = () => (
  <div className="w-1/2">
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
