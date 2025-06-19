import React from "react";
import TestPages from "@/components/modules/test/testPages";
import DndContainer from "@/components/modules/test/DndContainer";

const TestPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <DndContainer />
    </div>
  );
};

export default TestPage;
