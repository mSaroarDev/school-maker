"use client";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";

/* eslint-disable @typescript-eslint/no-explicit-any */
type OptionType<T = any> = {
  value: T;
  label: string;
};

type Props<T = any> = {
  options: any[];
  value?: any | any[] | null;
  onChange?: (selected: any) => void;
  isMulti?: boolean;
  placeholder?: string;
  className?: string;
  extraStyles?: Partial<StylesConfig<OptionType<T>>>;
};

export default function ReactSelect<T = any>({
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "Select...",
  className,
  extraStyles,
}: Props<T>) {
  const { theme } = useTheme();

  const themes = {
    light: {
      background: "#ffffff",
      border: "#d1d5db",
      borderHover: "#9ca3af",
      borderFocus: "#3b82f6",
      text: "#1f2937",
      textSecondary: "#6b7280",
      placeholder: "#9ca3af",
      optionHover: "#f3f4f6",
      optionSelected: "#e0e7ff",
      shadow: "rgba(0, 0, 0, 0.1)",
      focusRing: "rgba(59, 130, 246, 0.5)",
    },
    dark: {
      background: "#1f2937",
      border: "#374151",
      borderHover: "#4b5563",
      borderFocus: "#60a5fa",
      text: "#f9fafb",
      textSecondary: "#d1d5db",
      placeholder: "#9ca3af",
      optionHover: "#374151",
      optionSelected: "#1e3a8a",
      shadow: "rgba(0, 0, 0, 0.25)",
      focusRing: "rgba(96, 165, 250, 0.5)",
    },
  } as const;

  const current = theme === "dark" ? themes.dark : themes.light;

  const styles: StylesConfig<OptionType<T>, boolean> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: current.background,
      borderColor: state.isFocused ? current.borderFocus : current.border,
      boxShadow: state.isFocused ? `0 0 0 3px ${current.focusRing}` : "none",
      "&:hover": { borderColor: current.borderHover },
    }),
    singleValue: (base) => ({ ...base, color: current.text }),
    placeholder: (base) => ({ ...base, color: current.placeholder }),
    menu: (base) => ({
      ...base,
      backgroundColor: current.background,
      border: `1px solid ${current.border}`,
      boxShadow: `0 4px 6px ${current.shadow}`,
      zIndex: 99999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? current.optionSelected
        : state.isFocused
        ? current.optionHover
        : "transparent",
      color: current.text,
      cursor: "pointer",
    }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: current.border }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? current.borderFocus : current.textSecondary,
    }),
  };

  return (
    <Select
      options={options}
      value={value || null}
      isMulti={isMulti}
      placeholder={placeholder}
      className={className}
      classNamePrefix="react-select"
      styles={{ ...styles, ...extraStyles }}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      onChange={onChange}
    />
  );
}
