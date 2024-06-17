import { Controller } from "react-hook-form";

import AuthInputController from "@/components/AuthInputController";
import AuthRadioController from "@/components/AuthRadioController";
import AuthCheckboxController from "@/components/AuthCheckboxController";

const SignUpFormStep = ({ fields, errors, control }) => {
  return (
    <div className="space-y-6">
      {fields.map(({ children, options, as, name, type, ...otherProps }) => {
        let Component = AuthInputController;

        if (as === "radio") {
          Component = AuthRadioController;
        }

        if (as === "checkbox") {
          Component = AuthCheckboxController;
        }

        return (
          <Controller
            key={name}
            control={control}
            defaultValue=""
            {...otherProps}
            render={({ field }) => (
              <Component
                key={name}
                name={name}
                control={control}
                errors={errors}
                {...field}
                {...otherProps}
              >
                {children}
              </Component>
            )}
          />
        );
      })}
    </div>
  );
};

export default SignUpFormStep;
