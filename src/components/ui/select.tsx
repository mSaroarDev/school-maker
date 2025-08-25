import React from "react";
import Select, { Props as ReactSelectProps } from "react-select";
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
  FieldErrors,
} from "react-hook-form";
import { TInstallInstituteFormData } from "@/pages/guest-pages/install/interfaces/formdataInterface";
import ErrorLabel from "../_core/ErrorLabel";

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
  return (
    <>
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
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: errors && errors[name] ? "red" : provided.borderColor,
                boxShadow: state.isFocused
                  ? "0 0 0 3px var(--sidebar-ring, rgba(1, 100, 255, 0.5))"
                  : provided.boxShadow,
                transition: "color 0.2s, box-shadow 0.2s",
                outline: state.isFocused ? "0" : provided.outline,
              }),
            }}
          />
        )}
      />
      {errors && errors[name] && (
        <ErrorLabel msg={errors[name]?.message?.toString() || "This field is required"} />
      )}

    </>
  );
}

export default SelectComponent;