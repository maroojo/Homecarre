"use client";

import React, { useMemo, useState } from "react";
import { AutoComplete } from "antd";
import debounce from "lodash/debounce";

const InputAutoComplete = ({
  value,
  onChange,
  onSelect,
  onSelectItem,
  initialOptions,
  minLength = 2,
  debounceMs = 200,
  placeholder = "example: ",
  disabled,
  selectFromList = false,
  notFoundLabel = "ไม่พบข้อมูล",
  width,
}) => {
  const [options, setOptions] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const [searching, setSearching] = useState(false);

  const getHighlightedText = (text, highlight) => {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ fontWeight: "bold", color: "#1677ff" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearch = useMemo(
    () =>
      debounce(async (text) => {
        if (!text) {
          setOptions([]);
          setClientData([]);
          setSearching(true);
          return;
        }
        setSearching(true);

        const results = await initialOptions(text);
        if (!Array.isArray(results)) {
          console.warn("initialOptions did not return array:", results);
          setOptions([]);
          setClientData([]);
          setSearching(true);
          return;
        }

        const mapped = (results || []).map((item) => ({
          value: item.value,
          label: <div>{getHighlightedText(item.label, text)}</div>,
          item,
        }));

        setOptions(mapped);
        setClientData(results);
        setHasSelected(false);
        setSearching(true);
      }, debounceMs),
    [initialOptions, debounceMs, minLength]
  );

  const handleSelect = (val, option) => {
    if (val === "notfound") return;
    setHasSelected(true);
    if (onSelectItem) {
      onSelectItem(option.item || option);
    }
    onSelect?.(val, option);
  };

  const handleChange = (val) => {
    if (val !== value) {
      onChange?.(val);
      setHasSelected(false);
    }
  };

  const handleBlur = () => {
    if (selectFromList && !hasSelected) {
      onChange?.("");
    }
  };

  return (
    <AutoComplete
      value={value}
      disabled={disabled}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      style={{ width: "100%" }}
      popupMatchSelectWidth={false}
      notFoundContent={
        searching ? (
          <span style={{ color: "gray" }}>{notFoundLabel}</span>
        ) : null
      }
    />
  );
};

export default InputAutoComplete;
