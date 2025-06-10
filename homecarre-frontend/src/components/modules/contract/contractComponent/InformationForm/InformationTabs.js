import React from "react";
import { Form } from "antd";

import Information from "./Information";
import Agreement from "./Agreement";
import Document from "./Document";

import Request from "../history/Request";
import Payment from "../history/Payment";

const InformationTabs = (form, isEdit, hc_no) => [
  {
    key: "info",
    label: "Information",
    forceRender: true,
    children: (
      <Form
        form={form}
        layout="vertical"
        disabled={!isEdit}
        initialValues={{
          owners: [{ owner_name: "" }],
          tenants: [{ tenant_name: "" }],
        }}
      >
        <Information isEdit={isEdit} />
      </Form>
    ),
  },
  {
    key: "agree",
    label: "Agreement",
    forceRender: true,
    children: (
      <Form form={form} layout="vertical" disabled={!isEdit}>
        <Agreement />
      </Form>
    ),
  },
  {
    key: "doc",
    label: "Document",
    children: <Document hcNo={hc_no} />,
  },
  {
    key: "req",
    label: "Request",
    children: <Request />,
  },
  {
    key: "pay",
    label: "Payment",
    children: <Payment />,
  },
];

export default InformationTabs;
