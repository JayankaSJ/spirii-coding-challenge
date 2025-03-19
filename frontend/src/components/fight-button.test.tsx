import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FightButton } from "./fight-button";
import "@testing-library/jest-dom";
import { useDragonsContext } from "contexts/dragons-context";
import { useFightingContext } from "contexts/fighting-context";
import * as ReactQuery from "@tanstack/react-query";
import { ReactNode } from "react";
import { Dragon } from "@types";

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

// mock useMutation
const mockMutate = jest.fn();
jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );

  return {
    ...original,
    useMutation: jest.fn(() => ({
      mutate: mockMutate,
    })),
  };
});

const queryClient = new ReactQuery.QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <ReactQuery.QueryClientProvider client={queryClient}>
    {children}
  </ReactQuery.QueryClientProvider>
);

// mock contexts
jest.mock("contexts/dragons-context");
jest.mock("contexts/fighting-context");

const mockedUseDragonsContext = jest.mocked(useDragonsContext);
const mockedUseFightingContext = jest.mocked(useFightingContext);

describe("FightButton", () => {
  const setFighterCallback = jest.fn();
  const startFightMockCallback = jest.fn();
  const saveFightResultMockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseDragonsContext.mockReturnValue({
      dragons: mockDragons,
    } as unknown as ReturnType<typeof useDragonsContext>);
  });

  test("renders successfully", async () => {
    mockedUseFightingContext.mockReturnValue({
      fighter1: null,
      fighter2: null,
      setFighter: setFighterCallback,
    } as unknown as ReturnType<typeof useFightingContext>);

    render(<FightButton />, { wrapper });

    expect(screen.getByText("Start fight!")).toBeInTheDocument();
  });

  it("should disable the button if fighter1 or fighter2 is missing", () => {
    mockedUseFightingContext.mockReturnValue({
      fighter1: { id: 1, name: "Dragon1" },
      fighter2: undefined, // Fighter 2 is missing
      isStarted: false,
      startFight: startFightMockCallback,
      saveFightResult: saveFightResultMockCallback,
    } as unknown as ReturnType<typeof useFightingContext>);

    render(<FightButton />, { wrapper });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should call mutate when button is clicked and fight starts", async () => {
    mockedUseFightingContext.mockReturnValue({
      fighter1: { id: 1, name: "Dragon1" } as Dragon,
      fighter2: { id: 2, name: "Dragon2" } as Dragon,
      isStarted: false,
      startFight: startFightMockCallback,
      saveFightResult: saveFightResultMockCallback,
    } as unknown as ReturnType<typeof useFightingContext>);

    render(<FightButton />, { wrapper });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        dragons: [
          { id: 1, name: "Dragon1" },
          { id: 2, name: "Dragon2" },
        ],
      });
    });
  });
  //   const fakeResult = [
  //     { id: 1, name: "Dragon1" },
  //     { id: 2, name: "Dragon2" },
  //   ];

  //   mockedUseFightingContext.mockReturnValue({
  //     fighter1: { id: 1, name: "Dragon1" } as Dragon,
  //     fighter2: { id: 2, name: "Dragon2" } as Dragon,
  //     isStarted: false,
  //     startFight: startFightMockCallback,
  //     saveFightResult: saveFightResultMockCallback,
  //   } as unknown as ReturnType<typeof useFightingContext>);

  //   render(<FightButton />, { wrapper });

  //   // Simulating mutation success
  //   mockMutate.mockImplementationOnce((data, onSuccess) => {
  //     onSuccess(fakeResult);
  //   });

  //   const button = screen.getByRole("button");
  //   fireEvent.click(button);

  //   await waitFor(() =>
  //     expect(saveFightResultMockCallback).toHaveBeenCalledWith(
  //       fakeResult[0],
  //       fakeResult[1]
  //     )
  //   );
  // });
});
