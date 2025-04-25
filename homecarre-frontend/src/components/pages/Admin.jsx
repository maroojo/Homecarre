"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ContractsService from "@/services/admin/contractsService";

import { LTable, TSearch, TTable, TPagination } from "@components/ui";

import { columns } from "@pages/_columns/homeColumn";

//#region lazy load
const TModal = dynamic(
  () => import("@components/ui").then((mod) => mod.TModal),
  { ssr: false }
);
const Contract = dynamic(() => import("@pages/contract/Contract"), {
  ssr: false,
});
//#endregion lazy load

const Admin = () => {
  const { getContracts, getContract } = ContractsService();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [detailOpen, setDetailOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetContract = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getContract(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getContracts(page, pageSize);
      }

      if (response) {
        setData(response);
        setTotal(response.total || 0);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (id) => {
    setSelectedId(id);
    setDetailOpen(true);
  };
  const handleCloseDetail = () => {
    setDetailOpen(false);
    setSelectedId(null);
  };

  const handleSearch = (params) => {
    setSearchKey(params);
    setCurrentPage(1);
  };

  const handleRow = (record) => ({
    onClick: (e) => {
      if (e.target.closest("button")) {
        return;
      }
      handleDetail(record.hc_no);
    },
    className: "cursor-pointer",
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    callGetContract(searchKey, page);
  };

  useEffect(() => {
    callGetContract(searchKey);
  }, [searchKey]);

  return (
    <div>
      <LTable
        onSearch={<TSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        rightButton={
          <Button onClick={() => console.log("create ")}>
            <PlusOutlined /> add
          </Button>
        }
        pagination={
          <TPagination
            default={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            className="mt-4 text-center"
          />
        }
        modal={
          <TModal
            visible={detailOpen}
            onClose={handleCloseDetail}
            width={"95%"}
            maskClos={false}
          >
            <Contract id={selectedId} />
          </TModal>
        }
      >
        <TTable
          columns={columns}
          data={data.data}
          loading={loading}
          onRow={handleRow}
          rowKey={(record) => record.hc_no}
        />
      </LTable>
    </div>
  );
};

export default Admin;
