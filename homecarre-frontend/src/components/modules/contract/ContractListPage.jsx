"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useFromOrigin } from "@/context/FromOriginContext";
import { hcContract } from "@/services";
import { hcContacts } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./contractComponent/contractColumn";

//#region lazy load
const CoModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoModal),
  { ssr: false }
);
const Contract = dynamic(
  () => import("./contractComponent/contractModal/Contract"),
  {
    ssr: false,
  }
);
const CreateContract = dynamic(
  () => import("./contractComponent/contractModal/create/createContract"),
  {
    ssr: false,
  }
);
//#endregion lazy load

const ContractListPage = () => {
  const router = useRouter();
  const { getContracts, getContract } = hcContract();
  const { getContractList } = hcContacts;
  const { setFromOrigin } = useFromOrigin();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [createOpen, setCreateOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetContract = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getContractList(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getContractList(page, pageSize);
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

  const handleSearch = (params) => {
    setSearchKey(params);
    setCurrentPage(1);
  };

  const handleRow = (record) => ({
    onClick: (e) => {
      if (e.target.closest("button")) {
        return;
      }
      router.push(`/${record.hc_no}`);
    },
    className: "cursor-pointer",
  });

  const handleClick = (action, hcNo) => {
    setFromOrigin(action);
    router.push(`/${hcNo}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    callGetContract(searchKey, page);
  };

  useEffect(() => {
    callGetContract(searchKey);
  }, [searchKey]);

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        rightButton={
          <Button
            onClick={() => {
              router.push(`/create`);
            }}
          >
            <PlusOutlined /> add
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
          columns={columns(handleClick)}
          data={data.data}
          loading={loading}
          onRow={handleRow}
          rowKey={(record) => record.hc_no}
        />
      </ClTable>
    </div>
  );
};

export default ContractListPage;
