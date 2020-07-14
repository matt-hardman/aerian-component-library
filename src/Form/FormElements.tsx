import React, { useCallback, HTMLAttributes } from "react";
import { ErrorMessage } from "@hookform/error-message";
import cx from "classnames";

import ReactSelect from "react-select";

import styles from "./FormElements.module.scss";
import { useFormContext } from "./useFormContext";
import { Controller } from "react-hook-form";

interface Props<T = HTMLInputElement> extends HTMLAttributes<T> {
  hideLabel?: boolean;
  label: string;
  name: string;
}

interface FormInputProps extends Props {
  type?: string;
  errorMessage?: string;
}

interface FormGroupInputProps extends Props<HTMLFieldSetElement> {
  type?: "radio" | "checkbox";
  inputs: Array<Omit<RadioInputProps, "name">>;
}

interface RadioInputProps extends HTMLAttributes<HTMLElement> {
  label: string;
  value: string;
  name: string;
  type?: "radio" | "checkbox";
  defaultChecked?: boolean;
}

interface SelectOption {
  label: string;
  value?: string;
}

interface SelectedDropdownItem {
  name: string;
  label?: string;
  value: string;
}

interface SelectProps extends Omit<Props, "defaultValue" | "onChange"> {
  initialValue?: SelectOption;
  label: string;
  options: SelectOption[];
  onChange?: (selectedOption: SelectedDropdownItem) => void;
}

interface WrapComponentProps extends Record<string, any> {
  name: string;
  label: string;
  Component: React.FC<any>;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  label,
  name,
  type = "text",
  hideLabel = false,
  errorMessage,
  ...rest
}) => {
  const { register, errors } = useFormContext("FormInput");

  return (
    <div className={cx([styles.formItem, className])}>
      {!hideLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        aria-label={label}
        ref={register}
        aria-describedby={`err-${name}`}
        aria-invalid={!!errors[name]}
        className={styles.input}
        {...rest}
      />
      {/* disclosure pattern */}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span
            id={`err-${name}`}
            className={styles.errorMessage}
            aria-live="polite"
          >
            {errorMessage ?? message}
          </span>
        )}
      ></ErrorMessage>
    </div>
  );
};

export const RadioOrCheckInput: React.FC<RadioInputProps> = ({
  className,
  type = "radio",
  label,
  name,
  value,
  defaultChecked,
  ...rest
}) => {
  const { register } = useFormContext("RadioInput");

  return (
    <div key={value} className={cx([styles.radioOrCheckButton, className])}>
      <input
        id={value}
        name={name}
        type={type}
        value={value}
        ref={register}
        defaultChecked={defaultChecked}
        {...rest}
      />
      <label htmlFor={value} className={styles.radioOrCheckButtonLabel}>
        {label}
      </label>
    </div>
  );
};

export const FormInputGroup: React.FC<FormGroupInputProps> = ({
  className,
  hideLabel,
  label,
  name,
  inputs,
  type = "radio",
  ...rest
}) => {
  return (
    <fieldset
      name={name}
      className={cx([styles.formItem, styles.formItemGroup, className])}
      aria-label={label}
      {...rest}
    >
      {!hideLabel && <legend className={styles.label}>{label}</legend>}
      <div className={styles.radioOrCheckButtonGroup}>
        {inputs.map(({ value, label, defaultChecked }) => (
          <RadioOrCheckInput
            key={value}
            label={label}
            name={name}
            value={value}
            type={type}
            defaultChecked={defaultChecked}
          />
        ))}
      </div>
    </fieldset>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  initialValue,
  options,
  className,
  onChange,
  ...rest
}) => {
  const selectId = label.replace(/\s+/g, "-").toLowerCase();

  const setSelection = useCallback(
    (selectedOption) => {
      const name = selectId;
      const { label, value } = selectedOption;
      onChange({ name, label, value });
    },
    [onChange, selectId]
  );

  return (
    <div className={cx([className])} {...rest}>
      <label htmlFor={selectId}>{label}</label>
      <ReactSelect
        id={selectId}
        name={selectId}
        defaultValue={initialValue || options[0]}
        options={options}
        onChange={setSelection}
      />
    </div>
  );
};

export const FormSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  initialValue,
  className,
  ...rest
}) => (
  <ControlledElement
    Component={Select}
    name={name}
    label={label}
    options={options}
    initialValue={initialValue || options[0]}
    className={className}
    {...rest}
  ></ControlledElement>
);

// typings - pass in component props
export const ControlledElement: React.FC<WrapComponentProps> = ({
  Component,
  name,
  label,
  defaultValue,
  ...rest
}) => {
  const { control } = useFormContext(name);
  return (
    <Controller
      control={control}
      as={Component}
      name={name}
      label={label}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};
