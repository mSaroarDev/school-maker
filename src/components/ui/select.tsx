import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import Select, { Props as ReactSelectProps, StylesConfig } from "react-select";
import ErrorLabel from "../_core/ErrorLabel";
import { useTheme } from "next-themes";

type OptionType = {
  value: string | number;
  label: string;
};

type SelectComponentProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  options: OptionType[];
  isMulti?: boolean;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
} & Omit<
  ReactSelectProps<OptionType, boolean>,
  "options" | "isMulti" | "onChange" | "value" | "name" | "placeholder"
>;

function SelectComponent<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  options,
  isMulti = false,
  placeholder = "Select...",
  rules,
  ...rest
}: SelectComponentProps<TFieldValues, TName>) {
  const hasError = errors && errors[name];

  const { theme } = useTheme();

  // Theme configuration
  const themes = {
    light: {
      background: '#ffffff',
      border: '#d1d5db',
      borderHover: '#9ca3af',
      borderFocus: '#3b82f6',
      borderError: '#ef4444',
      text: '#1f2937',
      textSecondary: '#6b7280',
      placeholder: '#9ca3af',
      optionHover: '#f3f4f6',
      optionSelected: '#e0e7ff',
      shadow: 'rgba(0, 0, 0, 0.1)',
      focusRing: 'rgba(59, 130, 246, 0.5)',
    },
    dark: {
      background: '#1f2937',
      border: '#374151',
      borderHover: '#4b5563',
      borderFocus: '#60a5fa',
      borderError: '#f87171',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      placeholder: '#9ca3af',
      optionHover: '#374151',
      optionSelected: '#1e3a8a',
      shadow: 'rgba(0, 0, 0, 0.25)',
      focusRing: 'rgba(96, 165, 250, 0.5)',
    },
  } as const;

  type ThemeKey = keyof typeof themes;

  const currentTheme = themes[(theme as ThemeKey) ?? "light"];

  const customStyles: StylesConfig<OptionType, boolean> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: currentTheme.background,
      borderColor: hasError 
        ? currentTheme.borderError 
        : state.isFocused 
        ? currentTheme.borderFocus 
        : currentTheme.border,
      borderWidth: '1px',
      borderRadius: '4px',
      boxShadow: state.isFocused
        ? `0 0 0 3px ${currentTheme.focusRing}`
        : `0 1px 2px 0 ${currentTheme.shadow}`,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      // minHeight: '40px',
      cursor: 'pointer',
      '&:hover': {
        borderColor: hasError 
          ? currentTheme.borderError 
          : currentTheme.borderHover,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 8px',
      color: currentTheme.text,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: currentTheme.placeholder,
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: currentTheme.text,
      fontSize: '14px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? currentTheme.optionSelected : '#e5e7eb',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: currentTheme.text,
      fontSize: '12px',
      padding: '2px 6px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: currentTheme.textSecondary,
      '&:hover': {
        backgroundColor: currentTheme.borderError,
        color: '#ffffff',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: currentTheme.text,
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: currentTheme.background,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '6px',
      boxShadow: `0 10px 15px -3px ${currentTheme.shadow}, 0 4px 6px -2px ${currentTheme.shadow}`,
      zIndex: 9999,
      // Prevent overflow and ensure proper positioning
      position: 'absolute',
      width: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
      padding: '4px 0',
      // Custom scrollbar styling
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: currentTheme.textSecondary,
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: currentTheme.border,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? currentTheme.optionSelected
        : state.isFocused
        ? currentTheme.optionHover
        : 'transparent',
      color: state.isSelected
        ? theme === 'dark' ? '#ffffff' : currentTheme.text
        : currentTheme.text,
      fontSize: '14px',
      padding: '8px 12px',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out',
      '&:active': {
        backgroundColor: currentTheme.optionSelected,
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: currentTheme.border,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? currentTheme.borderFocus : currentTheme.textSecondary,
      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: currentTheme.borderFocus,
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: currentTheme.textSecondary,
      '&:hover': {
        color: currentTheme.borderError,
      },
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: currentTheme.borderFocus,
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: currentTheme.textSecondary,
      fontSize: '14px',
      padding: '12px',
    }),
  };

  return (
    <div style={{ position: 'relative' }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            {...rest}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            menuPlacement="auto" // Automatically adjust menu position to prevent overflow
            menuPosition="absolute" // Use absolute positioning for better control
            menuShouldBlockScroll={false} // Prevent body scroll blocking
            closeMenuOnScroll={false} // Keep menu open on scroll
            value={
              isMulti
                ? options.filter((option) =>
                  Array.isArray(field.value)
                    ? field.value.includes(option.value)
                    : false
                )
                : options.find((option) => option.value === field.value) || null
            }
            onChange={(selected) => {
              if (isMulti) {
                field.onChange(
                  Array.isArray(selected)
                    ? selected.map((opt) => opt.value)
                    : []
                );
              } else {
                field.onChange(selected ? (selected as OptionType).value : null);
              }
            }}
            onBlur={field.onBlur}
            name={field.name}
            styles={customStyles}
            classNamePrefix="react-select"
            // Additional props to prevent overflow
            isSearchable={rest.isSearchable !== false}
            isClearable={rest.isClearable}
            maxMenuHeight={200}
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            menuShouldScrollIntoView={false}
          />
        )}
      />
      {hasError && (
        <ErrorLabel 
          msg={hasError?.message?.toString() || "This field is required"} 
        />
      )}
    </div>
  );
}

export default SelectComponent;