import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main page", () => {
  render(<App />);
  const linkElement = screen.getByTestId("header-text");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Dragon Fight");
});
