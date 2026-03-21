"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

export const modeContext = createContext();

function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [addMode, setAddMode] = useState(false);

  return (
    <modeContext.Provider value={{ addMode, setAddMode }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </modeContext.Provider>
  );
}

export default QueryProvider;
