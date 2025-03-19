import { Dragon } from "@types";
import React, { createContext, useContext, useMemo } from "react";
import { getDragons } from "api/dragon.api";
import { useQuery } from "@tanstack/react-query";

export type DragonsContextType = {
  dragons: Dragon[];
  isLoading: boolean;
};

export const DragonsContext = createContext<DragonsContextType>({
  dragons: [],
  isLoading: false,
});

export const useDragonsContext = () => useContext(DragonsContext);

export const DragonsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: dragonResponse,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["dragons"],
    queryFn: getDragons,
  });

  const dragons = useMemo(() => {
    return dragonResponse || [];
  }, [dragonResponse]);

  const value = {
    dragons,
    isLoading: isFetching || isLoading,
  };
  return (
    <DragonsContext.Provider value={value}>{children}</DragonsContext.Provider>
  );
};
