import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import { Form } from '..';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('<Form/>', () =>{
  test('renders the form with all its elements', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnFocusChange = jest.fn();
    render(<Form onSubmit={mockOnSubmit} onFocusChange={mockOnFocusChange} />);
    const xInput = screen.getByTestId("x-position");
    const yInput = screen.getByTestId("y-position");
    const submitButton = screen.getByTestId("form-submit-button");
    await act(() => {
      userEvent.type(xInput,"5");
      userEvent.type(yInput,"5");
      userEvent.click(submitButton);
    })
    
    const message = await screen.queryByTestId(/validation-message/i);
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
    expect(xInput.value).toEqual("5");
    expect(yInput.value).toEqual("5");
    expect(message).not.toBeInTheDocument();
  });
  test('displays the validation message when any input value is outside of 1 and 5', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnFocusChange = jest.fn();
    render(<Form onSubmit={mockOnSubmit} onFocusChange={mockOnFocusChange} />);
    const xInput = screen.getByTestId("x-position");
    const yInput = screen.getByTestId("y-position");
    const submitButton = screen.getByTestId("form-submit-button");
    await act(() => {
      userEvent.type(xInput,"10");
      userEvent.type(yInput,"5");
      userEvent.click(submitButton);
    })
    
    const message = await screen.queryAllByTestId(/value-validation-message/i);
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(0));
    expect(xInput.value).toEqual("10");
    expect(yInput.value).toEqual("5");

    expect(message.length).toEqual(1);
  });
  test('displays the validation message any one of the required fields is empty upon submission', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnFocusChange = jest.fn();
    render(<Form onSubmit={mockOnSubmit} onFocusChange={mockOnFocusChange} />);
    const xInput = screen.getByTestId("x-position");
    const submitButton = screen.getByTestId("form-submit-button");
    await act(() => {
      userEvent.type(xInput,"3");
      userEvent.click(submitButton);
    })
    
    const message = await screen.queryAllByTestId(/required-validation-message/i);
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(0));
    expect(xInput.value).toEqual("3");

    expect(message.length).toEqual(1);
  });
});

