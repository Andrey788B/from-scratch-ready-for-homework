import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();
  
  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {

});
