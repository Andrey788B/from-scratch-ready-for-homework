import AddIcon from "../icons/add.png";

type Props = {
  onClick: () => void;
  disabled: boolean;
};
export const AddButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className="button button-with-icon"
      onClick={onClick}
      disabled={disabled}
      data-alt="добавить задачу"
    >
      <img src={AddIcon} alt="Добавить" />
    </button>
  );
};
