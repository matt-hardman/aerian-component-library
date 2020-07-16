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
        options={[
          {
            label: "Salmon",
            value: "salmon",
            defaultChecked: true,
          },
          {
            label: "Pike",
            value: "pike",
          },
          {
            label: "Trout",
            value: "trout",
          },
        ]}
      />

      <FormInputGroup
        name="peoples_name"
        label="People's Names"
        type="checkbox"
        options={[
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
        defaultValue={{ label: "Gouda", value: "gouda" }}
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

const ThemedFormContents = applyTheme(FormContents, { className: styles.form });
const ThemedFormControls = applyTheme(FormControls, {
  className: styles.formControls,
});

export const applyThemeForm = () => (
  <Form onSubmitFn={submitHandler} validationSchema={{}}>
    <ThemedFormContents>
      <FormInput
        name="email"
        label="Email"
        type="email"
        className={styles.formInput}
        placeholder="email@email.com"
      />

      <FormInput
        name="name"
        label="Name"
        placeholder="Your name"
        className={styles.formInput}
      />

      <FormInputGroup
        name="types_of_fish"
        label="Types of fish"
        optionsClassName={styles.radioSelectGroup}
        options={[
          {
            label: "Salmon",
            value: "salmon",
            defaultChecked: true,
          },
          {
            label: "Pike",
            value: "pike",
          },
          {
            label: "Trout",
            value: "trout",
          },
        ]}
      />

      <FormInputGroup
        name="peoples_name"
        label="People's Names"
        type="checkbox"
        optionsClassName={styles.radioSelectGroup}
        options={[
          {
            label: "Jon",
            value: "jon",
            defaultChecked: true,
            className: styles.customRadioSelect,
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
        className={styles.formInput}
        defaultValue={{ label: "Gouda", value: "gouda" }}
        options={[
          { label: "Cheddar", value: "cheddar" },
          { label: "Gouda", value: "gouda" },
          { label: "Brie", value: "brie" },
        ]}
      />
    </ThemedFormContents>
    <ThemedFormControls />
  </Form>
);
