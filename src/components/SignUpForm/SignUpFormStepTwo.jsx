"use client";

import "react-toastify/dist/ReactToastify.css";

import AuthInput from "@/components/AuthInput";

const SignUpFormStepTwo = ({ fields, errors, control }) => {
  return (
    <div className="space-y-6">
      {fields.map(({ children, name, ...otherProps }) => (
        <AuthInput
          key={name}
          name={name}
          control={control}
          errors={errors}
          {...otherProps}
        >
          {children}
        </AuthInput>
      ))}
    </div>
  );
};

export default SignUpFormStepTwo;
