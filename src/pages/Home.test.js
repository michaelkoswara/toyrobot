import { render, screen, within, fireEvent, getByText } from '@testing-library/react';
import { Home } from '.';

describe('Home page', () =>{
  test('renders the board', () => {
    render(<Home />);
    const boardElement = screen.getByTestId("playing-board");
    expect(boardElement).toBeInTheDocument();
  });
  test('renders 25 squares in the board', () => {
    render(<Home />);
    const squareElements = document.querySelectorAll("[data-testid=playing-board] .square");
    expect(squareElements.length).toEqual(25);
  });
  test('renders 1 robot on the board', () => {
    render(<Home />);
    const boardElement = screen.getByTestId("playing-board");
    const robots = within(boardElement).getAllByTestId("robot-icon");
    expect(robots.length).toEqual(1);
  });
  test('prevents robot from falling off if it is on the edge and displays a warning message', () => {
    // The initial position of the robot upon first-ever page load is (0,0). We can move it to the left to test the boundary.
    render(<Home />);
    const squareElements = document.querySelectorAll("[data-testid=playing-board] .square");
    const leftButton = screen.getByTestId("arrow-left");
    fireEvent.click(leftButton);
    const robot = within(squareElements[0]).getByTestId("robot-icon");
    const message = screen.getByTestId("robot-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/cannot fall off/i);
    expect(robot).toBeTruthy();
  });
});

