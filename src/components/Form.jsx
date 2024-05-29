import { forwardRef } from "react";

import Text from "@/components/Text";
import clsx from "clsx";

export const inputStyles = {
  input: [
    "placeholder:uppercase py-3 placeholder:text-queen-black/40 px-0 text-queen-black !bg-transparent border-0 border-b border-queen-black appearance-none peer",
    "focus:outline-none focus:ring-0 focus:border-queen-blue",
  ].join(" "),
  label: [
    "absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]",
    "peer-focus:font-medium peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
  ].join(" "),
};

const Select = ({ name, options, children }) => (
  <div key={name}>
    <label className="uppercase" for={name}>
      {children}
    </label>
    <select className="w-full" name={name} id={name}>
      <option value="" selected disabled>
        Select
      </option>
      {options.map((option, index) => (
        <option key={`${option}-${index}`}>{option}</option>
      ))}
    </select>
  </div>
);

const DynamicDatalist = ({ name, options, children, ...otherProps }) => (
  <div className="mb-4">
    <label htmlFor={name} className="uppercase">
      {children}
    </label>
    <input
      list={`${name}-options`}
      name={name}
      id={name}
      className={inputStyles.input}
      {...otherProps}
    />
    <datalist id={`${name}-options`}>
      {options.map((option, index) => (
        <option key={`${option}-${index}`} value={option} />
      ))}
    </datalist>
  </div>
);

export const Error = ({ children }) => (
  <div className="border-l-red-600 border-l-4 bg-red-50 text-queen-black/90 text-sm mt-4 py-2 px-4 rounded-sm">
    <p>{children}</p>
  </div>
);

export const Success = ({ children }) => (
  <div className="border-l-green-600 border-l-4 bg-green-50 text-queen-black/90 text-sm mt-4 py-2 px-4">
    <p>{children}</p>
  </div>
);

const Checkbox = ({ name, options, children }) => (
  <div key={name}>
    <Text className="mb-4 uppercase">{children}</Text>
    <div className="space-y">
      {options.map((option) => (
        <div className="inline-flex items-center gap-3 w-full" key={option}>
          <input
            type="checkbox"
            className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
            name={option}
            id={option}
          />
          <label for={name} className="text-sm">
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const Textarea = ({ name, children, ...otherProps }) => (
  <div>
    <label className="uppercase" for={name}>
      {children}
    </label>
    <textarea
      name={name}
      rows={6}
      className={inputStyles.input}
      {...otherProps}
    />
  </div>
);

const Input = ({
  name,
  type = "text",
  className,
  children,
  label = "md",
  description,
  ...otherProps
}) => (
  <div className={className}>
    <label
      className={clsx(label === "md" ? "uppercase" : "text-sm")}
      for={name}
    >
      {children}
    </label>
    {description && (
      <span className="block text-sm text-queen-black/80">{description}</span>
    )}

    <input
      type={type}
      className={inputStyles.input}
      name={name}
      id={name}
      {...otherProps}
    />
  </div>
);

const Form = forwardRef(function Form(
  {
    errors,
    setError,
    success,
    setSuccess,
    children,
    handleSubmit,
    ...otherProps
  },
  ref
) {
  return (
    <>
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          setError({});
          handleSubmit();
        }}
        {...otherProps}
      >
        {children}
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
      {success?.message && <Success>{success.message}</Success>}
    </>
  );
});

Form.Input = Input;

Form.Textarea = Textarea;

Form.Checkbox = Checkbox;

Form.Select = Select;

Form.DynamicDatalist = DynamicDatalist;

Form.Success = Success;

Form.Error = Error;

export default Form;
