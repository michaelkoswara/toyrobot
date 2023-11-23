import { render, screen, cleanup } from "@testing-library/react";
import { Board } from "..";

afterEach(cleanup);

describe("<Board/>", () => {
  test("renders the board and its children", () => {
    //Arrange & Act
    render(
      <Board>
        <button>Hello World</button>
      </Board>,
    );
    const boardElement = screen.getByTestId("playing-board");
    const button = document.querySelector("button");

    //Assert
    expect(boardElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Hello World");
  });
});
