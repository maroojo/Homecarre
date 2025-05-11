import { useState } from "react";
import { Tabs, Form, Input, Button } from "antd";
import "./MyTabs.css"; // ใช้ไฟล์ CSS

const { TabPane } = Tabs;

const MyTabs = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "detail",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "history",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div className="tabs-container 
     ">
      <Tabs
        className="tabs-custom"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default MyTabs;
