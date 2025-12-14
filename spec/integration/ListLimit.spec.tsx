import { render, screen } from "@testing-library/react";
import { store } from "src/store/configureStore";
import { addTask } from "src/store/taskSlice";
import { App } from "src/App";

describe("Ограничение на количество невыполненных задач", () => {
  it("нельзя создать 11-ю невыполненную задачу через action", () => {
    // добавляем 11 задач напрямую в стор: 11-я должна быть проигнорирована редьюсером
    for (let i = 0; i < 11; i += 1) {
      store.dispatch(addTask(`task-${i + 1}`));
    }

    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const uncompleted = checkboxes.filter((x) => !x.checked);

    expect(uncompleted).toHaveLength(10);
    expect(screen.queryByText(/task-11/i)).not.toBeInTheDocument();
  });
});
