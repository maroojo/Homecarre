"use client";

import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchTemp = ({ onSearch, pickDate = true }) => {
  const { RangePicker } = DatePicker;

  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState([]);

  const handleSearch = (keyword, date) => {
    onSearch({ keyword, ...(pickDate && { date }) });
  };
  const handleFocus = () => {
    setKeyword(null);
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
      className="flex flex-wrap items-end sm:gap-4"
      layout="vertical"
    >
      <Form.Item
        label="Search :"
        name="search"
        rules={[
          {
            validator: sqlInjection,
          },
        ]}
        className="w-full sm:w-auto"
      >
        <Input
          type="text"
          placeholder="ID, name, property"
          value={keyword}
          onFocus={handleFocus}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Form.Item>
      {pickDate && (
        <Form.Item label="Date :" name="date" className="w-3/4 sm:w-auto">
          <RangePicker
            value={date}
            onChange={(value) => setDate(value)}
            format="DD-MM-YYYY"
            allowClear
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          htmlType="submit"
          className="ml-4 sm:ml-0"
        ></Button>
      </Form.Item>
    </Form>
  );
};

export default SearchTemp;
