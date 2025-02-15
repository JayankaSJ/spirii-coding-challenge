import { DragonCard } from "components/dragon-card/dragon-card";
import { FightButton } from "components/fight-button/fight-button";
import React from "react";

export function FightArea() {
  return (
    <div className="flex flex-row gap-4 justify-center items-center w-full">
      <DragonCard />
      <FightButton />
      <DragonCard />
    </div>
  );
}
