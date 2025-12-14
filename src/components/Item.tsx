import { DeleteButton } from "./DeleteButton";
import { MAX_HEADER_LENGTH, validateHeaderMin } from "src/utils/helpers";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  const safeHeader = (() => {
    if (!validateHeaderMin(props.header)) {
      return "Без названия";
    }

    return props.header.length > MAX_HEADER_LENGTH
      ? `${props.header.slice(0, MAX_HEADER_LENGTH)}…`
      : props.header;
  })();

  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        id={props.id}
        checked={props.done}
        onChange={() => props.onToggle(props.id)}
      />
      <label htmlFor={props.id}>
        {props.done ? <s>{safeHeader}</s> : safeHeader}
      </label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
