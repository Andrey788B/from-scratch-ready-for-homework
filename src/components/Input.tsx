import { ChangeEvent, useMemo } from "react";

import "./styles.css";
import { headerFieldOptions, validateHeaderMax } from "src/utils/helpers";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabledMessage?: string;
  disabled?: boolean;
};

export const Input = ({
  value,
  onChange,
  disabledMessage,
  disabled,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    onChange(val);
  };

  const hintValue = useMemo(
    () => (validateHeaderMax(value) ? "" : headerFieldOptions.message),
    [value]
  );

  return (
    <div className="input-field-wrapper" data-testid="input-container">
      <input
        id="input-header-field-id"
        type="text"
        className="input-field-element input-field-node input-field-input"
        value={value}
        onChange={handleChange}
        placeholder={
          disabled ? disabledMessage : `например, введите "купить молоко"`
        }
        alt="поле для ввода заголовка задачи"
        title="поле для заголовка"
        data-testid="input-field"
        style={{ display: "flex" }}
        disabled={disabled}
      />
      <span data-testid="input-hint-text" className="input-field-hint">
        {hintValue}
      </span>
    </div>
  );
};
