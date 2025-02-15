import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { FightArea } from "modules/fight-area/fight-area";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <FightArea />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
