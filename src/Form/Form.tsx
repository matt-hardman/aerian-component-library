import React, { HTMLAttributes } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import cx from "classnames";

import { FormContext } from "./useFormContext";

import styles from "./Form.module.scss";

interface FormProps extends HTMLAttributes<HTMLElement> {
    validationSchema: Record<string, YupTypes>;
    onSubmitFn: (data: Record<string, string | string[]>) => void;
    onResetFn?: () => void;
}

type YupTypes = yup.StringSchema<string> | yup.ObjectSchema<object>;

interface FormContentsProps extends HTMLAttributes<HTMLElement> {}

interface FormControlsProps extends HTMLAttributes<HTMLElement> {
    submitButtonText?: string;
    resetButtonText?: string;
}

export const FormContents: React.FC<FormContentsProps> = ({
    children,
    className,
    ...rest
}) => (
    <div className={cx([styles.formContents, className])} {...rest}>
        {children}
    </div>
);

export const FormControls: React.FC<FormControlsProps> = ({
    className,
    submitButtonText = "Submit",
    resetButtonText = "Clear",
    ...rest
}) => (
    <div className={cx([styles.formControls, className])} {...rest}>
        <button type="submit">{submitButtonText}</button>

        <button type="reset">{resetButtonText}</button>
    </div>
);

export function Form({
    children,
    className,
    onSubmitFn,
    onResetFn,
    validationSchema,
    ...rest
}: FormProps) {
    const wrappedValidationSchema = yup.object().shape(validationSchema);

    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(wrappedValidationSchema),
    });

    return (
        <FormContext.Provider value={{ register, errors, control }}>
            <form
                onSubmit={handleSubmit(onSubmitFn)}
                onReset={onResetFn}
                className={cx([styles.form, className])}
                {...rest}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;
