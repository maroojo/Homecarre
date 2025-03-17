"use client";

import React from "react";
import { Table } from "antd";

const TableTemp = ({
  columns,
  data,
  loading = false,
  pagination = true,
  onRow,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onRow={onRow}
      rowKey={(record) => record.id || record.key}
      scroll={{ x: "max-content" }}
    />
  );
};

export default TableTemp;
