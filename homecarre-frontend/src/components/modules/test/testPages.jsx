"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";
import MyTabs from "./testmodal";

const OModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.OModal),
  { ssr: false }
);

const TestPages = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleModal}>test</Button>
      <OModal
        visible={open}
        onClose={() => setOpen(false)}
        title="Test Modal"
        width={800}
        maskClos={false}
      >
        <MyTabs />
      </OModal>
    </div>
  );
};

export default TestPages;
