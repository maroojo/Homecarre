"use client";

import React, { createContext, useContext, useState } from "react";

const FromOriginContext = createContext();

export const FromOriginProvider = ({ children }) => {
  const [fromOrigin, setFromOrigin] = useState(null);

  return (
    <FromOriginContext.Provider value={{ fromOrigin, setFromOrigin }}>
      {children}
    </FromOriginContext.Provider>
  );
};

export const useFromOrigin = () => useContext(FromOriginContext);
