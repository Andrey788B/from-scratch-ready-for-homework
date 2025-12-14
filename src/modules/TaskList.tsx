import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import {
  deleteTask,
  limitedTasksSelector,
  toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(limitedTasksSelector);
  const dispatch = useDispatch();
  const [isFiltered, setIsFiltered] = useState(false);

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const filteredItems = useMemo(
    () => (isFiltered ? items.filter((x) => !x.done) : items),
    [isFiltered, items]
  );

  if (items.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={() => setIsFiltered((v) => !v)}
      >
        {isFiltered ? "Показать все" : "Скрыть выполненные"}
      </button>
      <List items={filteredItems} onDelete={handleDelete} onToggle={handleToggle} />
    </>
  );
};
