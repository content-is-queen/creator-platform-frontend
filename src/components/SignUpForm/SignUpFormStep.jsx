import AuthInputController from "@/components/AuthInputController";
import AuthRadioController from "@/components/AuthRadioController";

const SignUpFormStep = ({ fields, errors, control }) => {
  return (
    <div className="space-y-6">
      {fields.map(({ children, options, name, type, ...otherProps }) => {
        let Component;

        switch (name) {
          case "goals":
            Component = AuthRadioController;
            break;
          default:
            Component = AuthInputController;
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
