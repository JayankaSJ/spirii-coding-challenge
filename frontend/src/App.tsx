import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FightArea } from "modules/fight-area/fight-area";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FightingContextProvider } from "contexts/fighting-context";
import { DragonsContextProvider } from "contexts/dragons-context";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DragonsContextProvider>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="flex flex-col gap-4 justify-center items-center p-10">
              <span className="text-3xl" data-testid="header-text">
                Dragon Fight
              </span>
              <FightingContextProvider>
                <FightArea />
              </FightingContextProvider>
            </div>
          </div>
        </DragonsContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
