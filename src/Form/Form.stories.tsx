import React from "react";
import * as yup from "yup";
import {
  Form,
  FormContents,
  FormControls,
  FormInput,
  FormInputGroup,
  WrapElement,
} from ".";
// import Select from "../Select";

export default {
  title: "Form",
};

const validationSchema = {
  email: yup.string().email().required(),
};

export const form = () => {
  const submitHandler = (d: any) => console.log(d);

  return (
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
          name="a_group_of_things"
          label="A group of things"
          inputs={[
            {
              label: "Thing 1",
              value: "thing_1",
              defaultChecked: true,
            },
            {
              label: "Thing 2",
              value: "thing_2",
            },
          ]}
        />
        <FormInputGroup
          name="another_group_of_things"
          label="Another group of things"
          type="checkbox"
          inputs={[
            {
              label: "Thing 1",
              value: "another_thing_1",
              defaultChecked: true,
            },
            {
              label: "Thing 2",
              value: "another_thing_2",
            },
          ]}
        />
        {/* <WrapElement
                    Component={Select}
                    name="thing_selector"
                    label="Thing selector"
                    options={[
                        { label: "Thing", value: "thing" },
                        { label: "Thing2", value: "thing2" },
                    ]}
                /> */}
        <FormControls />
      </FormContents>
    </Form>
  );
};
