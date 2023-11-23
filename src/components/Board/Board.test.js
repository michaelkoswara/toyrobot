import { render, screen, cleanup } from '@testing-library/react';
import { Board } from '..';

afterEach(cleanup);

describe('<Board/>', () =>{
  test('renders the board and its children', () => {
    render(<Board><button>Hello World</button></Board>);
    const boardElement = screen.getByTestId("playing-board");
    const button = document.querySelector("button");
    expect(boardElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Hello World");
  });
});

