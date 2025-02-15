import { DragonCard } from "components/dragon-card";
import { FightButton } from "components/fight-button";
import { useFightingContext } from "contexts/fighting-context";
import React from "react";

export function FightArea() {
  const { isAnyFighterDead } = useFightingContext();

  if (isAnyFighterDead) {
    return ShowWinner();
  }

  return (
    <div className="flex flex-row gap-4 justify-center items-center w-full">
      <DragonCard fighterSlot="fighter1" />
      <FightButton />
      <DragonCard fighterSlot="fighter2" />
    </div>
  );
}

function ShowWinner() {
  const { currentWinner } = useFightingContext();
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 rounded-lg shadow-lg">
      <span className="text-red-500">Winner!!!</span>

      <div className="flex flex-col gap-2">
        <span>Name: {currentWinner?.name}</span>
        <span>Strength: {currentWinner?.strength}</span>
        <span>Remaining health: {currentWinner?.currentHealth}</span>
      </div>
    </div>
  );
}
