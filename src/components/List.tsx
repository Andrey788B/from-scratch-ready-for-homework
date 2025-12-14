import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => (
  <ul className="task-list tasks">
    {items.map((item) => (
      <Item
        {...item}
        key={item.id}
        onDelete={onDelete}
        onToggle={onToggle} />
    ))}
  </ul>
);
