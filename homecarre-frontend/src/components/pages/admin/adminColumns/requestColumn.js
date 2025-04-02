import { Tag } from "antd";

export const columns = [
  {
    title: "Request No.",
    dataIndex: "request_no",
    key: "request_no",
    className: "w-20",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Date",
    dataIndex: "request_create",
    key: "request_create",
    className: "w-32",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Request By",
    dataIndex: "request_by",
    key: "request_by",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "HC No.",
    dataIndex: "hc_no",
    key: "hc_no",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Address",
    dataIndex: "property_name",
    key: "property_name",
    className: "w-36",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Detail",
    dataIndex: "request_topic",
    key: "request_topic",
    className: "w-72",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Schedule Date",
    key: "schedule",
    render: (_, record) => {
      return(
        <div className="line-clamp-1 h-[3rem] text-left">
            <div className="font-bold">{record.schedule[0].date}</div>
        </div>

      )
    },
  },
  {
    title: "Status",
    dataIndex: "request_status",
    key: "request_status",
    className: "w-10",
    render: (text) => {
      const statusColors = {
        New: "#fd1d1d",
        Deny: "#cecece",
        Approved: "#52c41a",
        Pending: "#faad14",
        Processing: "#1890ff",
      };
      return (
        <Tag
          color={statusColors[text] || "default"}
          className="line-clamp-1 h-[3rem] text-left"
        >
          {text}
        </Tag>
      );
    },
  },
];
