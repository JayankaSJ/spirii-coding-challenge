import { useDragonsContext } from "contexts/dragons-context";
import { useFightingContext } from "contexts/fighting-context";
import React, { useMemo } from "react";

export function DragonCard({
  fighterSlot,
}: {
  fighterSlot: "fighter1" | "fighter2";
}) {
  const { fighter1, fighter2, setFighter } = useFightingContext();

  const { dragons } = useDragonsContext();

  const selectedDragon = useMemo(() => {
    return fighterSlot === "fighter1" ? fighter1 : fighter2;
  }, [fighter1, fighter2, fighterSlot]);

  function handleSelectDragon(event: React.ChangeEvent<HTMLSelectElement>) {
    const dragonId = parseInt(event?.target?.value, 10);
    const selectedDragon = dragons.find((dragon) => dragon.id === dragonId);

    if (selectedDragon) {
      setFighter(selectedDragon, fighterSlot);
    }
  }

  return (
    <div className="px-6 py-4 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
      <span className="text-lg font-bold">Select your dragon</span>
      <div className="flex flex-col gap-4">
        <select value={selectedDragon?.id} onChange={handleSelectDragon}>
          <option value="">Select a dragon</option>
          {dragons.map((dragon) => (
            <option key={dragon.id} value={dragon.id}>
              {dragon.name}
            </option>
          ))}
        </select>

        {selectedDragon && (
          <>
            <hr />
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold">Dragon details</span>
              <span>Name: {selectedDragon.name}</span>
              <span>Strength: {selectedDragon.strength}</span>
              <span>Current health: {selectedDragon.currentHealth}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
