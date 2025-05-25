"use client";

import React, { useEffect, useState } from "react";

import { hcRequest } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./requestComponent/requestColumn";

const RequestListPage = () => {
  const { getRepairs } = hcRequest();

  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetRepair = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getRepairs(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getRepairs(page, pageSize);
      }
      if (response) {
        setData(response);
        setTotal(response.total || 0);
        console.log(response);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchKey(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    callGetContract(searchKey, page);
  };

  useEffect(() => {
    callGetRepair(searchKey);
  }, [searchKey]);

  const tableData = data ? data.data : [];

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        pagination={
          <CtPagination
            default={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            className="mt-4 text-center"
          />
        }
      >
        <CtTable
          columns={columns}
          data={tableData}
          loading={loading}
          rowKey={(record) => record.request_no}
        />
      </ClTable>
    </div>
  );
};
export default RequestListPage;
