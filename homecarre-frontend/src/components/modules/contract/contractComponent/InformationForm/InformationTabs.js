import React from "react";
import { Form } from "antd";

import Information from "./Information";
import Agreement from "./Agreement";
import Document from "./Document";

import Request from "../history/Request";
import Payment from "../history/Payment";

const InformationTabs = (form, isEdit) => [
  {
    key: "info",
    label: "Information",
    children: (
      <Form form={form} layout="vertical" disabled={!isEdit}>
        <Information />
      </Form>
    ),
  },
  {
    key: "agree",
    label: "Agreement",
    children: (
      <Form form={form} layout="vertical" disabled={!isEdit}>
        <Agreement />
      </Form>
    ),
  },
  {
    key: "doc",
    label: "Document",
    children: (
      <Form form={form} layout="vertical" disabled={!isEdit}>
        <Document />
      </Form>
    ),
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
