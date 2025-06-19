import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DndDropZone = ({ id, children }) => {
  return (
    <div
      id={id}
      data-zone-id={id}
      className="min-h-[150px] border-2 border-dashed rounded-lg p-4 bg-gray-50"
    >
      <h4 className="mb-2 font-semibold text-center text-gray-600">
        {id === "create" ? "Create Zone" : `Drop Zone ${id.slice(-1)}`}
      </h4>
      {children}
    </div>
  );
};

export default DndDropZone;
