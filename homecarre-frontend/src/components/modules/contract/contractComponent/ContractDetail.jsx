"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Form, Tabs, Button, Spin } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useFromOrigin } from "@/context/FromOriginContext";
import { hcContacts } from "@homecarre-api";
import InformationTabs from "./InformationForm/InformationTabs";
import useNotification from "@/hooks/useNotification";

const ContractDetail = ({ hcId }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const { getContract, updateContract } = hcContacts;
  const { fromOrigin, setFromOrigin } = useFromOrigin();
  const { success, error } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [tenantCode, setTenantCode] = useState([]);
  const [ownerCode, setOwnerCode] = useState([]);

  const getContractId = async () => {
    setLoading(true);
    try {
      const response = await getContract(hcId);
      if (response?.data) {
        const { owners = [], tenants = [] } = response.data;

        const ownerNames = owners.map((o) => o.owner_name).join(", ");
        const tenantNames = tenants.map((t) => t.tenant_name).join(", ");
        setTenantCode(response.data.tenant_code);
        setOwnerCode(response.data.owner_code);
        form.setFieldsValue({
          HCNo: response.data.hc_no,
          propertyCode: response.data.property_code,
          propertyName: response.data.property_name,
          propertyDetail: response.data.property_detail,
          owners: response.data.owners?.length
            ? response.data.owners
            : [{ owner_name: "" }],
          tenants: response.data.tenants?.length
            ? response.data.tenants
            : [{ tenant_name: "" }],
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

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        hc_no: values.HCNo,
        property_code: values.propertyCode,
        property_name: values.propertyName,
        property_detail: values.propertyDetail,
        date_start: values.dateRange?.[0]?.format("YYYY-MM-DD"),
        date_end: values.dateRange?.[1]?.format("YYYY-MM-DD"),
        agreement_lease: Number(values.time),
        agreement_date_pay: Number(values.agreementDatePay),
        rent_price: Number(values.rentPrice),
        bank: values.bank,
        account_name: values.accountName,
        account_no: values.accountNo,
        owners: values.owners || [],
        tenants: values.tenants || [],
      };

      const response = await updateContract(data);

      if (response?.isSuccess) {
        setIsEdit(false);
        getContractId();
        success({
          message: `Contract updated to successfully`,
          onClose: () => {},
        });
      } else {
        console.error("Update failed:", response?.message);
        error({
          message: `Failed to update status: ${response.message}`,
          onClose: () => {},
        });
      }
    } catch (err) {
      console.error("Validation or Update Error:", err);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      handleSave();
    } else {
      setIsEdit(true);
    }
  };

  const hideButton =
    activeTabKey === "doc" || activeTabKey === "pay" || activeTabKey === "req";
  const tabItems = InformationTabs(form, isEdit, hcId);

  useEffect(() => {
    form.resetFields();
    setLoading(true);
    setIsEdit(false);
    if (hcId) {
      getContractId();
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
              style={
                isEdit
                  ? { background: "var(--color-state-success) !important" }
                  : { background: "var(--color-state-warning) !important" }
              }
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
