import { render, cleanup, within } from "@testing-library/react";
import { Square } from "..";

afterEach(cleanup);

describe("<Square/>", () => {
  test("renders the square with a robot", async () => {
    //Arrange & Act
    render(<Square hasRobot />);
    const square = document.querySelector(".square");
    const robotIcon = within(square).queryByTestId("robot-icon");
    const giftIcon = within(square).queryByTestId("gift-icon");

    //Assert
    expect(robotIcon).toBeInTheDocument();
    expect(giftIcon).not.toBeInTheDocument();
  });
  test("renders the square with a gift", async () => {
    //Arrange & Act
    render(<Square hasGift />);
    const square = document.querySelector(".square");
    const robotIcon = within(square).queryByTestId("robot-icon");
    const giftIcon = within(square).queryByTestId("gift-icon");

    //Assert
    expect(robotIcon).not.toBeInTheDocument();
    expect(giftIcon).toBeInTheDocument();
  });
});
