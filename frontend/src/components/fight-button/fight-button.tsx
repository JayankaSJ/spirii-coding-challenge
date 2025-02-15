import { useMutation } from "@tanstack/react-query";
import { postFightDragons } from "api/dragon.api";

export function FightButton() {
  const { mutate, isError, error } = useMutation({
    mutationKey: ["dragons-fight"],
    mutationFn: postFightDragons,
  });

  function handleFight() {
    const dragons = [{ id: 1 }, { id: 2 }];
    mutate({
      dragons,
    });
  }

  return (
    <button
      onClick={handleFight}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Fight!
    </button>
  );
}
