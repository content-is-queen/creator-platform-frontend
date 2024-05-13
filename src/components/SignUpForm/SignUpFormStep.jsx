"use client";

import "react-toastify/dist/ReactToastify.css";

import AuthInput from "@/components/AuthInput";
import AuthRadio from "@/components/AuthRadio";

const SignUpFormStep = ({ fields, errors, control }) => {
  return (
    <div className="space-y-6">
      {fields.map(({ children, options, name, ...otherProps }) => {
        const Component = options ? AuthRadio : AuthInput;
        return (
          <Component
            key={name}
            name={name}
            control={control}
            errors={errors}
            {...(options ? { options: options } : {})}
            {...otherProps}
          >
            {children}
          </Component>
        );
      })}
    </div>
  );
};

export default SignUpFormStep;
