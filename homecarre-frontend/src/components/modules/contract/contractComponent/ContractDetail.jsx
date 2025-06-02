"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Form, Tabs, Button, Spin } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useFromOrigin } from "@/context/FromOriginContext";
import { hcContract } from "@homecarre-api";
import InformationTabs from "./InformationForm/InformationTabs";

const ContractDetail = ({ hcId }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const { getContractById, updateContract } = hcContract();
  const { fromOrigin, setFromOrigin } = useFromOrigin();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [tenantCode, setTenantCode] = useState([]);
  const [ownerCode, setOwnerCode] = useState([]);

  const getContract = async () => {
    setLoading(true);
    try {
      const response = await getContractById(hcId);
      if (response?.data) {
        // setData(response.data);
        setTenantCode(response.data.tenant_code);
        setOwnerCode(response.data.owner_code);
        form.setFieldsValue({
          HCNo: response.data.hc_no,
          propertyCode: response.data.property_code,
          owner: response.data.owner_name,
          tenant: response.data.tenant_name,
          time: response.data.agreement_lease,
          agreementDatePay: response.data.agreement_date_pay,
          rentPrice: response.data.rent_price,
          bank: response.data.bank_name,
          accountName: response.data.account_name,
          accountNo: response.data.bank_no,
          dateRange: [
            dayjs(response.data.date_start, dateFormat),
            dayjs(response.data.date_end, dateFormat),
          ],
        });
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      // handleSave();
    }
    setIsEdit(!isEdit);
  };

  const hideButton =
    activeTabKey === "doc" || activeTabKey === "pay" || activeTabKey === "req";
  const tabItems = InformationTabs(form, isEdit, hcId);

  useEffect(() => {
    form.resetFields();
    setLoading(true);
    setIsEdit(false);
    if (hcId) {
      getContract();
    }

    if (fromOrigin) {
      setActiveTabKey(fromOrigin);
      setFromOrigin("info");
    } else {
      setActiveTabKey("info");
    }
  }, [hcId]);

  return (
    <div>
      <div className="flex items-end justify-start gap-4">
        <h2 className="text-xl font-semibold">Contract Information : </h2>
        <p className="text-xl ml-5 font-semibold">{hcId}</p>
      </div>
      <div className="mt-2">
        <Spin spinning={loading}>
          <Tabs
            items={tabItems}
            activeKey={activeTabKey}
            onChange={(key) => setActiveTabKey(key)}
          />

          {!hideButton && (
            <Button
              type="primary"
              icon={isEdit ? <SaveOutlined /> : <EditOutlined />}
              onClick={toggleEdit}
              color={isEdit ? "green" : "blue"}
              variant="solid"
            >
              {isEdit ? "Save" : "Edit"}
            </Button>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default ContractDetail;
