import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the main App component without crashing", () => {
  //Arrange & Act
  render(<App />);
  const mainHeader = screen.getByTestId("main-header");

  //Assert
  expect(mainHeader).toBeInTheDocument();
});
