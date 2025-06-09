import { Tag } from "antd";
import RequestImage from "@modules/request/requestComponent/RequestImage";
import StatusDropdownButton from "@modules/request/requestComponent/statusDropdownButton";

export const columns = (status = [], onChangeStatus) => [
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
    title: "Detail",
    dataIndex: "request_topic",
    key: "request_topic",
    className: "w-72",
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
    title: "Schedule Date",
    key: "schedule",
    render: (_, record) => {
      return (
        <div className="line-clamp-1 h-[3rem] text-left">
          <div className="font-bold">{record.schedule[0].date}</div>
        </div>
      );
    },
  },
  {
    title: "Image",
    dataIndex: "files",
    key: "files",
    className: "w-36",
    render: (text, record) =>
      text ? (
        <div data-stop-propagation>
          <RequestImage text={text} hc_no={record.hc_no} />
        </div>
      ) : (
        ""
      ),
  },
  {
    title: "Status",
    dataIndex: "request_status",
    key: "request_status",
    className: "w-10",
    render: (text, record) => (
      <div data-stop-propagation>
        <StatusDropdownButton
          text={text}
          statusList={status}
          record={record}
          onChange={onChangeStatus}
        />
      </div>
    ),
  },
];
