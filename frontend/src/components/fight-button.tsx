import { useMutation } from "@tanstack/react-query";
import { Dragon } from "@types";
import { postFightDragons } from "api/dragon.api";
import { useFightingContext } from "contexts/fighting-context";
import { useMemo } from "react";
import cx from "classnames";

export function FightButton() {
  const { fighter1, fighter2, isStarted, startFight, saveFightResult } =
    useFightingContext();

  const { mutate } = useMutation({
    mutationKey: ["dragons-fight"],
    mutationFn: postFightDragons,
    onSuccess(data, variables, context) {
      saveFightResult(data[0], data[1]);
    },
  });

  const isDisabled = useMemo(() => {
    return !fighter1 || !fighter2;
  }, [fighter1, fighter2]);

  function handleFight() {
    const dragons = [fighter1 as Dragon, fighter2 as Dragon];
    mutate({
      dragons,
    });
    startFight();
  }

  return (
    <button
      onClick={handleFight}
      className={cx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        {
          "bg-gray-500": isDisabled,
          "cursor-not-allowed": isDisabled,
        }
      )}
      disabled={isDisabled}
    >
      {isStarted ? "Fight again!" : "Start fight!"}
    </button>
  );
}
