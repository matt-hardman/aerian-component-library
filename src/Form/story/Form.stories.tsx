import React from "react";
import * as yup from "yup";
import {
  Form,
  FormContents,
  FormControls,
  FormInput,
  FormInputGroup,
  FormSelect,
} from "..";

import styles from "./FormStory.module.scss";
import applyTheme from "../../Theme";

export default {
  title: "Form",
};

const validationSchema = {
  email: yup.string().email().required(),
};

interface FormInputs {
  email: string;
  types_of_fish: string;
  peoples_name: string[];
  types_of_cheese: string;
}

const submitHandler = (d: FormInputs) => console.log(d);

export const form = () => (
  <Form onSubmitFn={submitHandler} validationSchema={validationSchema}>
    <FormContents>
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="email@email.com"
      />

      <FormInput name="name" label="Name" placeholder="Your name" />
      <FormInputGroup
        name="types_of_fish"
        label="Types of fish"
        inputs={[
          {
            label: "Salmon",
            value: "salmon",
            defaultChecked: true,
          },
          {
            label: "Pike",
            value: "pike",
          },
        ]}
      />

      <FormInputGroup
        name="peoples_name"
        label="People's Names"
        type="checkbox"
        inputs={[
          {
            label: "Jon",
            value: "jon",
            defaultChecked: true,
          },
          {
            label: "Amy",
            value: "amy",
          },
          {
            label: "Carol",
            value: "carol",
          },
        ]}
      />

      <FormSelect
        name="types_of_cheese"
        label="Types of cheese"
        initialValue={{ label: "Gouda", value: "gouda" }}
        options={[
          { label: "Cheddar", value: "cheddar" },
          { label: "Gouda", value: "gouda" },
          { label: "Brie", value: "brie" },
        ]}
      />
      <FormControls />
    </FormContents>
  </Form>
);

export const themedForm = () => (
  <Form onSubmitFn={submitHandler} validationSchema={validationSchema}>
    <FormContents className={styles.formContents}>
      <FormInput
        name="name"
        label="Name"
        placeholder="Your name"
        className={styles.formInput}
      />
    </FormContents>

    <FormControls className={styles.formControls} />
  </Form>
);

const ThemedForm = applyTheme(Form, { className: styles.themedForm });
const ThemedFormControls = applyTheme(FormControls, {
  className: styles.themedFormControls,
});

export const applyThemeForm = () => (
  <ThemedForm onSubmitFn={submitHandler} validationSchema={{}}>
    <FormContents>
      <FormInput label="Hello" name="hello"></FormInput>
    </FormContents>
    <ThemedFormControls />
  </ThemedForm>
);
