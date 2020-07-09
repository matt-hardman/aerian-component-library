import { useContext, createContext } from "react";
import { DeepMap, FieldError } from "@hookform/error-message/dist/types";

interface FormContext {
  register?: () => void;
  control?: any;
  errors?: DeepMap<Record<string, any>, FieldError>;
}

export const FormContext = createContext<FormContext>({});

export const useFormContext = (name = "Component") => {
  const context = useContext(FormContext);
  if (Object.keys(context).length === 0 && context.constructor === Object) {
    throw new Error(`${name} must be used inside a <Form /> component`);
  }

  return context;
};
