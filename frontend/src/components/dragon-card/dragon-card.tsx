import { useQuery } from "@tanstack/react-query";
import { getDragons } from "api/dragon.api";
import React, { useMemo } from "react";

export function DragonCard() {
  const {
    data: dragonResponse,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["dragons"], queryFn: getDragons });

  const dragons = useMemo(() => {
    return dragonResponse || [];
  }, [dragonResponse]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <select id="dragon">
        {dragons.map((dragon) => (
          <option key={dragon.id} value={dragon.id}>
            {dragon.name}
          </option>
        ))}
      </select>

      <h2>Dragon Card</h2>
    </div>
  );
}
