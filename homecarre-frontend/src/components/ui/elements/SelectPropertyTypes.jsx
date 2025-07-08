import React from "react";
import { Select } from "antd";

const propertyOptions = [
  {
    label: "ที่อยู่อาศัย (Residential)",
    options: [
      { label: "Condominium", value: "condominium" },
      { label: "House", value: "house" },
      { label: "Apartment", value: "apartment" },
      { label: "Townhouse", value: "townhouse" },
      { label: "Villa", value: "villa" },
    ],
  },
  {
    label: "เชิงพาณิชย์ (Commercial)",
    options: [
      { label: "Office Space", value: "office_space" },
      { label: "Retail/Showroom", value: "retail_showroom" },
      { label: "Shophouse", value: "shophouse" },
      { label: "Warehouse", value: "warehouse" },
    ],
  },
  {
    label: "ที่ดินเปล่า (Land)",
    options: [{ label: "Land", value: "land" }],
  },
];

const PropertyTypeSelect = ({ value, onChange, ...props }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      showSearch
      optionFilterProp="label"
      placeholder="Select property type"
      {...props}
      options={propertyOptions}
    />
  );
};

export default PropertyTypeSelect;
