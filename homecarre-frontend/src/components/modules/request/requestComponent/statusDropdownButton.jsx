import { Dropdown, Tag } from "antd";
import React, { useState } from "react";

const StatusDropdownButton = ({ text, statusList, record, onChange }) => {
  const statusColors = {
    New: "#fd1d1d",
    Deny: "#cecece",
    Done: "#52c41a",
    Pending: "#faad14",
    Processing: "#1890ff",
  };

  const [open, setOpen] = useState(false);

  const handleMenuClick = ({ key }) => {
    onChange(record.payment_no, key);
  };

  const handleOnClick = () => {
    setOpen((prev) => !prev);
  };

  const statusItem = statusList.find((s) => s.code === text);
  const colorClass = statusItem?.colorClass || "bg-state-ignore";
  const label = statusItem?.label || text;

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        onClick: handleMenuClick,
        items: statusList.map((item) => ({
          key: item.code,
          label: item.label,
        })),
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Tag
          color={statusColors[text] || "default"}
          className="line-clamp-1 h-[3rem] text-left"
        >
          {label}
        </Tag>
      </div>
    </Dropdown>
  );
};

export default StatusDropdownButton;
