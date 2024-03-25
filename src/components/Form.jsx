"use client";

import { useForm } from "react-hook-form";

import Input from "@/components/Input";

const Form = ({ fields }) => {
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      {fields.map(({ children, name, ...otherProps }) => (
        <Input
          key={name}
          name={name}
          control={control}
          errors={errors}
          {...otherProps}
        >
          {children}
        </Input>
      ))}
    </>
  );
};

export default Form;
