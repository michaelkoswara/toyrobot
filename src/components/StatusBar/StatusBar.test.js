import { render, cleanup, within, screen } from "@testing-library/react";
import { StatusBar } from "..";

afterEach(cleanup);

describe("<StatusBar/>", () => {
  test("renders the status bar with the inputs", async () => {
    //Arrange & Act
    render(<StatusBar xPosition={45} yPosition={33} />);
    const statusBar = screen.getByTestId("statusBar");
    const xPosition = within(statusBar).getByText(/45/);
    const yPosition = within(statusBar).getByText(/33/);

    //Assert
    expect(statusBar).toBeInTheDocument();
    expect(xPosition).toBeTruthy();
    expect(yPosition).toBeTruthy();
  });
});
