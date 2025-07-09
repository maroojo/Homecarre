"use client";

import React from "react";
import { CeIac } from "@homecarre-ui";
import { hcClients } from "@homecarre-api";

const ClientAutoComplete = (props) => {
  const { searchClient } = hcClients();

  const initialClientOption = async (keyword) => {
    const response = await searchClient(keyword);
    if (response?.isSuccess && response.data.length > 0) {
      return response.data.map((client) => ({
        value: client.client_code,
        label: `${client.client_code} - ${client.fullname} - ${client.telephone}`,
        client,
      }));
    }
  };

  return (
    <CeIac
      {...props}
      debounceMs={300}
      initialOptions={initialClientOption}
      placeholder="search client name telephone code"
      notFoundLabel={
        <>
          ไม่พบข้อมูล! กรุณาตรวจสอบความถูกต้อง
          <hr className="my-3 text-border" />
          หรือกด <strong className="text-primary-base">+ New</strong>{" "}
          เพื่อสร้างใหม่
        </>
      }
    />
  );
};

export default ClientAutoComplete;
