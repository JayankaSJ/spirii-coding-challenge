import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DragonCard } from "./dragon-card";
import "@testing-library/jest-dom";
import { useDragonsContext } from "contexts/dragons-context";
import { useFightingContext } from "contexts/fighting-context";

const mockDragons = [
  {
    id: 1,
    name: "Dragon 1",
    strength: 10,
    currentHealth: 100,
  },
  {
    id: 2,
    name: "Dragon 2",
    strength: 20,
    currentHealth: 100,
  },
];

jest.mock("contexts/dragons-context");
jest.mock("contexts/fighting-context");

const mockedUseDragonsContext = jest.mocked(useDragonsContext);
const mockedUseFightingContext = jest.mocked(useFightingContext);

describe("DragonCard", () => {
  const setFighterCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseDragonsContext.mockReturnValue({
      dragons: mockDragons,
    } as unknown as ReturnType<typeof useDragonsContext>);

    mockedUseFightingContext.mockReturnValue({
      fighter1: null,
      fighter2: null,
      setFighter: setFighterCallback,
    } as unknown as ReturnType<typeof useFightingContext>);
  });

  test("renders successfully", async () => {
    render(<DragonCard fighterSlot="fighter1" />);

    expect(screen.getByText("Select your dragon")).toBeInTheDocument();
  });

  test("renders dragon options and selects a dragon", async () => {
    render(<DragonCard fighterSlot="fighter1" />);

    const select = screen.getByTestId("dragon-select");

    fireEvent.change(select, {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(setFighterCallback).toHaveBeenCalledWith(
        mockDragons[0],
        "fighter1"
      );
    });
  });
});
