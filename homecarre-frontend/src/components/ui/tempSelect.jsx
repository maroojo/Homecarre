import React from "react";
import { Select } from "antd";

const { Option } = Select;

const TempSelect = ({ options, selectedValue, onSelect, placeholder }) => {
  return (
    <Select
      value={selectedValue}
      onChange={onSelect}
      style={{ width: "100%" }}
      placeholder={placeholder || "Please select"}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default TempSelect;
