import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

type Option = {
  label: string;
  value: string;
};

type SelectComponentProps = {
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  onChange: (value: string | string[] | "") => void;
  value: Option | Option[] | null;
  rest?: React.SelectHTMLAttributes<HTMLSelectElement>;
  isClearable?: boolean;
};

const SelectComponent = ({
  options,
  isMulti = false,
  placeholder = "Select...",
  onChange,
  value,
  isClearable = false,
  ...rest
}: SelectComponentProps) => {

  const handleChange = (
    selected: SingleValue<Option> | MultiValue<Option> | null,
    _actionMeta: ActionMeta<Option>
  ) => {
    if (!selected) {
      onChange("");
    } else if (Array.isArray(selected)) {
      onChange(selected.map(opt => opt.value));
    } else if (!Array.isArray(selected) && selected && typeof selected === "object" && "value" in selected) {
      onChange((selected as Option).value);
    }
  };

  // Ensure value is correct type for isMulti
  const safeValue =
    isMulti && Array.isArray(value)
      ? value
      : !isMulti && value && !Array.isArray(value)
        ? value
        : null;

  return (
    <Select
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      onChange={handleChange}
      value={safeValue}
      isClearable={isClearable}
      className="react-select-container"
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

export { SelectComponent };