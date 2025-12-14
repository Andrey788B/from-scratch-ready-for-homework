import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { Item } from "src/components/Item";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Элемент списка задач", () => {
  it("название не должно быть больше 32 символов", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const header = "012345678901234567890123456789012345"; // 36 символов

    render(
      <Item
        id="1"
        header={header}
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    // в UI заголовок должен быть обрезан до 32 и содержать многоточие
    const label = screen.getByText(/01234567890123456789012345678901…/);
    expect(label).toBeInTheDocument();
  });

  it("название не должно быть пустым", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header=""
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    expect(screen.getByText("Без названия")).toBeInTheDocument();
  });

  it("нельзя удалять невыполненные задачи", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="Любая задача"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /удалить/i });
    expect(deleteBtn).toBeDisabled();

    await userEvent.click(deleteBtn);
    expect(onDelete).not.toBeCalled();
  });

  it("можно удалить выполненную задачу", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="Готово"
        done={true}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /удалить/i });
    expect(deleteBtn).not.toBeDisabled();
    await userEvent.click(deleteBtn);

    expect(onDelete).toBeCalledWith("1");
  });

  it("переключение статуса вызывается ровно один раз", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="Toggle"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(onToggle).toBeCalledTimes(1);
    expect(onToggle).toBeCalledWith("1");
  });
});
