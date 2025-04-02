"use client";

import React from "react";
import { Table } from "antd";

const TableTemp = ({ columns, data, loading = false, onRow, rowKey }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      onRow={onRow}
      rowKey={rowKey}
      scroll={{ x: "max-content" }}
      align="top"
    />
  );
};

export default TableTemp;
