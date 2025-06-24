"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useFromOrigin } from "@/context/FromOriginContext";
import { hcRequest } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./requestComponent/requestColumn";

const RequestListPage = () => {
  const router = useRouter();
  const { getRepairs } = hcRequest();
  const { setFromOrigin } = useFromOrigin();

  const [searchKey, setSearchKey] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetRepair = async (searchParams, page = 1) => {
    setLoading(true);
    console.log("page", page);
    try {
      const response = await getRepairs({
        keyword: searchParams.keyword || null,
        dateRange: searchParams.date || [],
        page: page,
        pagesize: pageSize,
      });
      if (response) {
        console.log("request", response, response.data, response.total);
        setData(response.data);
        setTotal(response.total || 0);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchKey(params.keyword);
    setDateRange(params.date);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    console.log("click", page);
    setCurrentPage(page);
    callGetRepair(searchKey, page);
  };

  const handleRow = (record) => ({
    onClick: (e) => {
      if (
        e.target.closest("button") ||
        e.target.closest("[data-stop-propagation]")
      ) {
        return;
      }
      setFromOrigin("req");
      router.push(`/${record.hc_no}`);
    },
    className: "cursor-pointer",
  });

  useEffect(() => {
    callGetRepair({ searchKey, date: dateRange });
  }, [searchKey, dateRange]);

  const tableData = data ? data : [];

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={total ?? "N/A"}
        rightButton={
          <Button
            variant="solid"
            onClick={() => {
              router.push(`/create`);
            }}
          >
            <PlusOutlined /> Request
          </Button>
        }
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
          onRow={handleRow}
          rowKey={(record) => record.request_no}
        />
      </ClTable>
    </div>
  );
};
export default RequestListPage;
