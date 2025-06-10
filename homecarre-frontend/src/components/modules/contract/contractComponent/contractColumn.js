import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export const columns = (onActionClick) => [
  {
    title: "HC No.",
    dataIndex: "hc_no",
    key: "hc_no",
    className: "w-24",
    render: (_, record) => {
      return (
        <div className="text-left line-clamp-2 ">
          {record.hc_no && <div className=" ">{record.hc_no}</div>}
          {record.ct_no && (
            <div className="text-[0.6rem] text-state-ignore">{record.ct_no}</div>
          )}
        </div>
      );
    },
  },
  {
    title: "Address",
    key: "address",
    className: "w-32 md:w-64",
    render: (_, record) => {
      return (
        <div className="flex flex-col text-xs">
          {record.property_name && (
            <div className="font-bold">{record.property_name}</div>
          )}
          {record.property_detail && <div>{record.property_detail}</div>}
        </div>
      );
    },
  },
  {
    title: "Owner",
    dataIndex: "owner_name",
    key: "owner",
    className: "w-16 md:w-32",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Tenant",
    dataIndex: "tenant_name",
    key: "tenant",
    className: "w-16 md:w-32",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "เรื่มสัญญา",
    dataIndex: "date_start",
    key: "contractStart",
    className: "w-28",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "สิ้นสุดสัญญา",
    dataIndex: "date_end",
    key: "contractEnd",
    className: "w-28",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "ค่าเช่า",
    dataIndex: "rent_price",
    key: "rent",
    className: "w-20",
    sorter: (a, b) => a.rent - b.rent,
    render: (value) => (
      <div className="line-clamp-1 h-[3rem] text-left">
        {typeof value === "number" || !isNaN(value)
          ? Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })
          : "N/A"}
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "hc_status",
    key: "status",
    className: "w-12",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    className: "w-12",
    render: (_, record) => (
      <Button type="link" onClick={() => onActionClick("pay", record.hc_no)}>
        <MoreOutlined className="cursor-pointer p-1" />
      </Button>
    ),
  },
  {
    title: "Request",
    dataIndex: "request",
    key: "request",
    className: "w-12",
    render: (_, record) => (
      <Button type="link" onClick={() => onActionClick("req", record.hc_no)}>
        <MoreOutlined className="cursor-pointer p-1" />
      </Button>
    ),
  },
];
