"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Row, Col, Tag, Button } from "antd";

import ContractsService from "@/services/admin/contractsService";

import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";
import PaginationTemp from "@ui/paginationTemp";

import { columns } from "@admin/adminColumns/homeColumn";

const ModalTemp = dynamic(() => import("@ui/modalTemp"), { ssr: false });
const Contract = dynamic(
  () => import("@admin/contract/Contract"),
  { ssr: false }
);

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
      <Row className="flex sm:justify-between items-end">
        <Col span={20}>
          <Col span={24}>
            <SearchTemp onSearch={handleSearch} />
          </Col>
          <Col span={12}>
            <Tag>{`total : ${data?.total ?? "N/A"}`}</Tag>
          </Col>
        </Col>
      </Row>
      <TableTemp
        columns={columns}
        data={data.data}
        loading={loading}
        onRow={handleRow}
        rowKey={(record) => record.hc_no}
      />
      <Row justify={"end"} className="my-10">
        <PaginationTemp
          default={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          className="mt-4 text-center"
        />
      </Row>
      <ModalTemp
        visible={detailOpen}
        onClose={handleCloseDetail}
        width={"95%"}
        maskClos={false}
      >
        <Contract id={selectedId} />
      </ModalTemp>
    </div>
  );
};

export default Admin;
