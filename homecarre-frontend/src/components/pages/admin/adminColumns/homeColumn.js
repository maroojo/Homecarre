import { Tooltip, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "HC No.",
    dataIndex: "id",
    key: "id",
    className: "w-24",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    className: "w-32 md:w-64",
    sorter: (a, b) => a.address.localeCompare(b.address),
    render: (text) => (
      <Tooltip
        title={text}
        Style={{
          maxWidth: "400px",
          maxHeight: "8em",
          lineHeight: "1.5em",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        autoAdjustOverflow={true}
      >
        <div className="line-clamp-3 h-[3rem] text-left">{text}</div>
      </Tooltip>
    ),
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    className: "w-16 md:w-32",
    sorter: (a, b) => a.owner.localeCompare(b.owner),
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    className: "w-16 md:w-32",
    sorter: (a, b) => a.tenant.localeCompare(b.tenant),
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "เรื่มสัญญา",
    dataIndex: "contractStart",
    key: "contractStart",
    className: "w-28",
    sorter: (a, b) =>
      new Date(a.contractStart.split(" / ").reverse().join("-")) -
      new Date(b.contractStart.split(" / ").reverse().join("-")),
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "สิ้นสุดสัญญา",
    dataIndex: "contractEnd",
    key: "contractEnd",
    className: "w-28",
    sorter: (a, b) =>
      new Date(a.contractEnd.split(" / ").reverse().join("-")) -
      new Date(b.contractEnd.split(" / ").reverse().join("-")),
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "ค่าเช่า",
    dataIndex: "rent",
    key: "rent",
    className: "w-20",
    sorter: (a, b) => a.rent - b.rent,
    render: (value) => (
      <div className="line-clamp-1 h-[3rem] text-left">
        {value.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
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
      <Button type="link" onClick={() => console.log(record)}>
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
      <Button type="link" onClick={() => console.log(record)}>
        <MoreOutlined className="cursor-pointer p-1" />
      </Button>
    ),
  },
];
