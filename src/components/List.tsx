import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => (
  <ul className="task-list tasks">
    {(() => {
      // UI-level защита: максимум 10 невыполненных задач
      let uncompletedLeft = 10;
      const limited = items.filter((task) => {
        if (task.done) return true;
        if (uncompletedLeft <= 0) return false;
        uncompletedLeft -= 1;
        return true;
      });

      return limited.map((item) => (
        <Item
          {...item}
          key={item.id}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ));
    })()}
  </ul>
);
