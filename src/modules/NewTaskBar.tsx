import { useState } from "react";
import { AddButton } from "src/components/AddButton";
import { Input } from "src/components/Input";
import { validateHeaderMax, validateHeaderMin } from "src/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addTask, uncompleteCount } from "src/store/taskSlice";

import "./styles.css";

export const NewTaskBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const uncomplete = useSelector(uncompleteCount);

  const handleAdd = () => {
    if (validateHeaderMax(value)) {
      dispatch(addTask(value));
      setValue("");
    }
  };

  const disabled =
    !validateHeaderMin(value) || !validateHeaderMax(value) || uncomplete >= 10;

  return (
    <div className="new-task-bar">
      <Input
        value={value}
        onChange={(val) => setValue(val)}
        disabled={uncomplete >= 10}
        disabledMessage="Нельзя завести больше 10 невыполненных задач"
      />
      <AddButton onClick={handleAdd} disabled={disabled} />
    </div>
  );
};
