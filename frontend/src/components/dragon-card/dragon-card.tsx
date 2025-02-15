import { useQuery } from "@tanstack/react-query";
import { getDragons } from "api/dragon.api";
import React from "react";

export function DragonCard() {
  const query = useQuery({ queryKey: ["dragons"], queryFn: getDragons });

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2>Dragon Card</h2>
    </div>
  );
}
