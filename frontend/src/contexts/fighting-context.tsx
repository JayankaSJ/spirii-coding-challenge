import { Dragon } from "@types";
import React, { createContext, useContext, useMemo, useState } from "react";

export type FightingContextType = {
  isStarted: boolean;
  fighter1?: Dragon;
  fighter2?: Dragon;
  currentWinner?: Dragon;
  isAnyFighterDead: boolean;

  startFight: () => void;
  setFighter: (fighter: Dragon, fighterSlot: "fighter1" | "fighter2") => void;
  saveFightResult: (fighter1: Dragon, fighter2: Dragon) => void;
};

export const FightingContext = createContext<FightingContextType>({
  isStarted: false,
  isAnyFighterDead: false,
  currentWinner: undefined,
  startFight: () => {},
  setFighter: () => {},
  saveFightResult: () => {},
});

export const useFightingContext = () => useContext(FightingContext);

export const FightingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [fighter1, setFighter1] = useState<Dragon>();
  const [fighter2, setFighter2] = useState<Dragon>();

  const isAnyFighterDead = useMemo(() => {
    if (fighter1 && fighter1?.currentHealth < 0) {
      return true;
    }
    if (fighter2 && fighter2?.currentHealth < 0) {
      return true;
    }
    return false;
  }, [fighter1, fighter2]);

  const currentWinner = useMemo(() => {
    return [fighter1, fighter2].find(
      (fighter) => (fighter?.currentHealth || 0) > 0
    );
  }, [fighter1, fighter2]);

  function startFight() {
    setIsStarted(true);
  }

  function setFighter(fighter: Dragon, fighterSlot: "fighter1" | "fighter2") {
    switch (fighterSlot) {
      case "fighter1":
        setFighter1(fighter);
        break;
      case "fighter2":
        setFighter2(fighter);
        break;
    }
  }

  function saveFightResult(fighter1: Dragon, fighter2: Dragon) {
    setFighter1(fighter1);
    setFighter2(fighter2);
  }

  const value = {
    isStarted,
    fighter1,
    fighter2,
    isAnyFighterDead,
    currentWinner,
    startFight,
    setFighter,
    saveFightResult,
  };
  return (
    <FightingContext.Provider value={value}>
      {children}
    </FightingContext.Provider>
  );
};
