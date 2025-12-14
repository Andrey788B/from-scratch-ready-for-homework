import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  it("с включенным фильтром", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, "Задача 1");
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, "Задача 2");
    await userEvent.click(addBtnEl);

    // завершаем вторую задачу
    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    await userEvent.click(checkboxes[1]);

    // включаем фильтр (скрыть выполненные)
    const filterBtn = screen.getByRole("button", {
      name: /скрыть выполненные/i,
    });
    await userEvent.click(filterBtn);

    // в списке остаётся только невыполненная задача
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument();
  });

  it("с выключенным фильтром", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, "Задача 1");
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, "Задача 2");
    await userEvent.click(addBtnEl);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    await userEvent.click(checkboxes[1]);

    // включаем и выключаем фильтр
    await userEvent.click(screen.getByRole("button", { name: /скрыть выполненные/i }));
    await userEvent.click(screen.getByRole("button", { name: /показать все/i }));

    // в списке снова обе задачи, причём выполненная отображается зачёркнутой
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
    expect(screen.getByText("Задача 2").closest("s")).not.toBeNull();
  });

  it("выполненная задача исчезает сразу при активном фильтре", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.type(inputEl, "Задача, которую завершим");
    await userEvent.click(addBtnEl);

    // включаем фильтр заранее
    await userEvent.click(screen.getByRole("button", { name: /скрыть выполненные/i }));

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    await userEvent.click(checkbox);

    // сразу пропала из списка
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
