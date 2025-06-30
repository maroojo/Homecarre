"use client";

import React, { useMemo, useState } from "react";
import { AutoComplete } from "antd";
import debounce from "lodash/debounce";

const InputAutoComplete = ({
  value,
  onChange,
  onSelect,
  initialOptions,
  minLength = 2,
  debounceMs = 200,
  placeholder = "example: ",
  disabled,
}) => {
  const [options, setOptions] = useState([]);

  const handleSearch = useMemo(
    () =>
      debounce(async (text) => {
        if (!text || text.length < minLength) return;

        const results = await initialOptions(text);
        setOptions(results || []);
      }, debounceMs),
    [initialOptions, debounceMs, minLength]
  );

  return (
    <AutoComplete
      value={value}
      disabled={disabled}
      options={options}
      onSearch={handleSearch}
      onSelect={onSelect}
      onChange={(val) => {
        if (val !== value) {
          onChange?.(val);
        }
      }}
      placeholder={placeholder}
      style={{ width: "100%" }}
    />
  );
};

export default InputAutoComplete;
