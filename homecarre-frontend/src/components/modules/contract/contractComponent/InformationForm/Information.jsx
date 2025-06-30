import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const DetailTab = ({ isEdit }) => {
  return (
    <div className="w-1/2">
      <Row gutter={16} className="w-full">
        <Col span={5}>
          <Form.Item label="Homecarre No." name="HCNo">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Property Code" name="propertyCode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item label="Property Name" name="propertyName">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={5}>
          <Form.Item label="unit / house No." name="unit">
            <Input />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name="propertyDetail" label="Address">
            <Input.TextArea className="!rounded-2xl" />
          </Form.Item>
        </Col>
      </Row>

      {/* Owner Section */}
      <Form.List name="owners">
        {(fields, { add, remove }) => (
          <div>
            <Row>
              <Col span={5}>Client Code</Col>
              <Col span={12} className="mb-2">
                Owners
              </Col>
              <Col span={7}>Telephone</Col>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row
                  gutter={16}
                  key={key}
                  style={{ display: "flex", width: "100%" }}
                  align="end"
                >
                  <Col span={5}>
                    <Form.Item {...restField} name={[name, "owner_code"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "owner_name"]}
                      rules={[
                        { required: true, message: "Please enter owner name" },
                      ]}
                    >
                      <Input placeholder={`Owner ${index + 1}`} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item {...restField} name={[name, "owner_telephone"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Col>
                </Row>
              ))}
            </Row>
            <div className={isEdit ? "visible" : "hidden"}>
              <Form.Item>
                <Row justify="end">
                  <Col span={3}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Owner
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </div>
          </div>
        )}
      </Form.List>

      {/* Tenant Section */}
      <Form.List name="tenants">
        {(fields, { add, remove }) => (
          <div>
            <Row>
              <Col span={5}>Client Code</Col>
              <Col span={12} className="mb-2">
                Tenants
              </Col>
              <Col span={7}>Telephone</Col>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row
                  gutter={16}
                  key={key}
                  style={{ display: "flex", width: "100%" }}
                  align="end"
                >
                  <Col span={5}>
                    <Form.Item {...restField} name={[name, "tenant_code"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "tenant_name"]}
                      rules={[
                        { required: true, message: "Please enter tenant name" },
                      ]}
                    >
                      <Input placeholder={`Tenant ${index + 1}`} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item {...restField} name={[name, "tenant_telephone"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Col>
                </Row>
              ))}
            </Row>
            <div className={isEdit ? "visible" : "hidden"}>
              <Form.Item>
                <Row justify="end">
                  <Col span={3}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Tenant
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </div>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default DetailTab;
