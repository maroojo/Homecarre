"use client";

import React, { useState } from "react";
import { Row, Tag, Modal } from "antd";
import { columns } from "@admin/adminColumns/homeColumn";
import useApiContracts from "./adminComponent/fetchContracts";
import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";

const Admin = () => {
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [selectedId, setSelectedId] = useState(null);
  const { data, loading } = useApiContracts();

  const handleSearch = (params) => {
    setSearchKey(params);
  };

  const handleRowClick = (record) => {
    console.log("click table");
    setSelectedId(record.id);
  };

  const handleRow = (record) => ({
    onClick: (e) => {
      if (e.target.closest("button")) {
        return;
      }
      handleRowClick(record);
    },
    className: "cursor-pointer",
  });

  return (
    <div>
      <Row className="flex sm:justify-between items-end">
        <SearchTemp onSearch={handleSearch} />
        <Tag>{`total : ${data.length}`}</Tag>
      </Row>
      <TableTemp
        columns={columns}
        data={data}
        loading={loading}
        onRow={handleRow}
      />
      <Modal
        title="Contract ID"
        open={selectedId !== null}
        onCancel={() => setSelectedId(null)}
        footer={null}
      >
        <p>{`Contract ID: ${selectedId}`}</p>
      </Modal>
    </div>
  );
};

export default Admin;
