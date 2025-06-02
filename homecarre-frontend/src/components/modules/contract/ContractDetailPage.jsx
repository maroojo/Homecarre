import React from "react";
import ContractDetail from "./contractComponent/ContractDetail"

const ContractDetailPage = ({ hcId }) => {
  return (
    <div>
      <div className="mt-4 w-full bg-white shadow-md rounded-lg p-4 h-[calc(100vh-150px)] overflow-y-auto no-scrollbar">
        <ContractDetail hcId={hcId} />
      </div>
    </div>
  );
};

export default ContractDetailPage;
