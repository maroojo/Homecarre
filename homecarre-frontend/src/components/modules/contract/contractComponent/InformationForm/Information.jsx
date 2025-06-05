import { Form, Input, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const DetailTab = () => (
  <div className="w-1/2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <Form.Item label="Homecarre No." name="HCNo">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Property Code" name="propertyCode">
        <Input disabled />
      </Form.Item>
    </div>

    {/* Owner Section */}
    <Form.List name="owners">
      {(fields, { add, remove }) => (
        <div>
          <label className="font-semibold block mb-2">Owners</label>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, "owner_name"]}
                rules={[{ required: true, message: "Please enter owner name" }]}
              >
                <Input placeholder={`Owner ${index + 1}`} />
              </Form.Item>

              {index > 0 && (
                <MinusCircleOutlined onClick={() => remove(name)} />
              )}
            </Space>
          ))}
          <Form.Item>
            {/* <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Owner
            </Button> */}
          </Form.Item>
        </div>
      )}
    </Form.List>

    {/* Tenant Section */}
    <Form.List name="tenants">
      {(fields, { add, remove }) => (
        <div>
          <label className="font-semibold block mb-2">Tenants</label>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, "tenant_name"]}
                rules={[
                  { required: true, message: "Please enter tenant name" },
                ]}
              >
                <Input placeholder={`Tenant ${index + 1}`} />
              </Form.Item>

              {index > 0 && (
                <MinusCircleOutlined onClick={() => remove(name)} />
              )}
            </Space>
          ))}
          <Form.Item>
            {/* <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Tenant
            </Button> */}
          </Form.Item>
        </div>
      )}
    </Form.List>
  </div>
);

export default DetailTab;
