"use client";

import React, { useState } from "react";
import { Row, Tag, Modal } from "antd";
import { columns } from "@admin/adminColumns/clientColumn";
import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";

const ClientAccount = () => {
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const { data, setData } = useState([]);

  const handleSearch = (params) => {
    setSearchKey(params);
  };

  return (
    <div>
      <Row className="flex sm:justify-between items-end mb-4">
        <SearchTemp onSearch={handleSearch} />
        <Tag>{`total : 30`}</Tag>
      </Row>
      <TableTemp columns={columns} data={data} />
    </div>
  );
};

export default ClientAccount;
