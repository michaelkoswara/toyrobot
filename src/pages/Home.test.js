import { render, screen, within, act, cleanup } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

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
  test('prevents robot from falling off if it is on the edge and displays a warning message', async () => {
    // The initial position of the robot upon first-ever page load is (0,0). We can move it to the left to test the boundary.
    render(<Home />);
    const squareElements = document.querySelectorAll("[data-testid=playing-board] .square");
    const leftButton = screen.getByTestId("arrow-left");
    await act(() => {
      userEvent.click(leftButton);
    })
    const robot = within(squareElements[0]).getByTestId("robot-icon");
    const message = screen.getByTestId("robot-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/cannot fall off/i);
    expect(robot).toBeTruthy();
  });
  test('the robot can move without any warning messages', async () => {
    render(<Home />);
    const squareElements = document.querySelectorAll("[data-testid=playing-board] .square");
    const leftButton = screen.getByTestId("arrow-left");
    const downButton = screen.getByTestId("arrow-down");
    await act(()=>{
      userEvent.click(leftButton);
      userEvent.click(downButton);
    })
    const robot = within(squareElements[1]).queryByTestId("robot-icon");
    const message = screen.queryByTestId("robot-message");
    expect(message).not.toBeInTheDocument();
    expect(robot).toBeTruthy();
  });
  test('the user can enter an x and y location to reset robot location', async () => {
    render(<Home />);
    const squareElements = document.querySelectorAll("[data-testid=playing-board] .square");
    const xInput = screen.getByTestId("x-position");
    const yInput = screen.getByTestId("y-position");
    const submitButton = screen.getByTestId("form-submit-button");
    await act(() => {
      userEvent.type(xInput, "5");
      userEvent.type(yInput, "5");
      userEvent.click(submitButton);
    })
    
    const robot = await (within(squareElements[24])).findByTestId("robot-icon");
    const message = screen.queryByTestId("robot-message");
    expect(xInput.value).toEqual("5");
    expect(yInput.value).toEqual("5");
    expect(message).not.toBeInTheDocument();
    expect(robot).toBeTruthy();
  });
});

