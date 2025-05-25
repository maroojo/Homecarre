import React from "react";
import { PaContractDetail } from "@homecarre-modules";

const page = async ({ params }) => {
  const { hcID } = await params;
  return (
    <div>
      <PaContractDetail hcId={hcID} />
    </div>
  );
};

export default page;
