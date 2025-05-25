import React from "react";
import ContractDetail from "./contractComponent/ContractDetail"

const ContractDetailPage = ({ hcId }) => {
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <p className="text-sm ml-5 font-semibold">{hcId}</p>
      </div>
      <div className="mt-4 w-full bg-white shadow-md rounded-lg p-4 h-[calc(100vh-150px)] overflow-y-auto no-scrollbar">
        <ContractDetail hcId={hcId} />
      </div>
    </div>
  );
};

export default ContractDetailPage;
