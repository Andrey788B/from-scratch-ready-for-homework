import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Оповещение при вополнении задачи", () => {
  it("при выполнении задачи должно появляться оповещение", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtn = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, "Моя задача");
    await userEvent.click(addBtn);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    await userEvent.click(checkbox);

    expect(screen.getByText(/Задача "Моя задача" завершена/i)).toBeInTheDocument();
  });

  it("одновременно может быть только одно оповещение", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, "Первая");
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, "Вторая");
    await userEvent.click(addBtnEl);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];

    await userEvent.click(checkboxes[0]);
    expect(screen.getByText(/Задача "Первая" завершена/i)).toBeInTheDocument();

    // сразу выполняем вторую: сообщение должно замениться
    await userEvent.click(checkboxes[1]);

    expect(screen.queryByText(/Задача "Первая" завершена/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Задача "Вторая" завершена/i)).toBeInTheDocument();

    // таймер должен считаться от последнего уведомления
	    act(() => {
	      jest.advanceTimersByTime(1999);
	    });
    expect(screen.getByText(/Задача "Вторая" завершена/i)).toBeInTheDocument();
	    act(() => {
	      jest.advanceTimersByTime(1);
	    });
    expect(screen.queryByText(/Задача "Вторая" завершена/i)).not.toBeInTheDocument();
  });
});
