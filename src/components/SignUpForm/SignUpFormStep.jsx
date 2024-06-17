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
