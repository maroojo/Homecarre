"use client";

import React from "react";
import { CeIac } from "@homecarre-ui";
import { hcContacts } from "@homecarre-api";

const HcNoAutoComplete = (props) => {
  const { searchHcNo } = hcContacts;

  const initialHcNoOptions = async (keyword) => {
    const response = await searchHcNo(keyword);
    if (response?.isSuccess && response.data.length > 0) {
      return response.data.map((hc_no) => ({ value: hc_no }));
    }
    return [];
  };

  return (
    <CeIac
      {...props}
      initialOptions={initialHcNoOptions}
      placeholder={"example : hc-000111"}
    />
  );
};

export default HcNoAutoComplete;
