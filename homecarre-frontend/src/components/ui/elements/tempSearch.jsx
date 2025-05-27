"use client";

import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TempSearch = ({
  onSearch,
  pickDate = true,
  pickStatus = true,
  statusOptions = [],
}) => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState(["All"]);

  const handleSearch = () => {
    const searchParams = { keyword };
    if (pickDate) searchParams.date = date;
    if (pickStatus && status.length && !status.includes("All"))
      searchParams.status = status;
    onSearch(searchParams);
  };
  const handleFocus = () => {
    setKeyword(null);
  };

  const handleStatusChange = (value) => {
    setStatus([value]);
  };

  const sqlInjection = (rule, value) => {
    const sqlPattern = /SELECT|INSERT|UPDATE|DELETE|DROP/i;
    if (sqlPattern.test(value)) {
      return Promise.reject(new Error("Invalid SQL command detected"));
    }
    return Promise.resolve();
  };

  return (
    <Form
      onFinish={handleSearch}
      className="flex flex-wrap items-end mb-4"
      layout="vertical"
    >
      <Row align={"bottom"}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            label="Search :"
            name="search"
            rules={[
              {
                validator: sqlInjection,
              },
            ]}
            className="w-full"
          >
            <Input
              type="text"
              placeholder="ID, name, property"
              value={keyword}
              onFocus={handleFocus}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Item>
        </Col>
        {pickDate && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Date :" name="date">
              <RangePicker
                value={date}
                onChange={(value) => setDate(value)}
                format="DD-MM-YYYY"
                allowClear
              />
            </Form.Item>
          </Col>
        )}
        {pickStatus && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Status :" name="status">
              <Select
                allowClear
                placeholder="Select status"
                value={status}
                onChange={handleStatusChange}
              >
                <Option value="All">All</Option>
                {statusOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              className="ml-4"
            ></Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TempSearch;
