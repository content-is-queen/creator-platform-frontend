import { useState } from "react";
import { Controller } from "react-hook-form";

const AuthCheckboxController = ({
  name,
  options,
  children,
  max,
  rules,
  errors,
  control,
  ...otherProps
}) => {
  const [checked, setChecked] = useState([]);

  const disabled = checked.length === parseInt(max);

  return (
    <div className="space-y grid grid-cols-2 gap-x-6">
      {options.map((option, index) => {
        const id = option.replaceAll(" ", "-").toLowerCase();

        return (
          <div key={id}>
            <div className="inline-flex items-center gap-x-3 w-full">
              <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value, ...otherProps } }) => (
                  <>
                    <input
                      type="checkbox"
                      className="p-1 w-4 h-4 border-queen-black appearance-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-queen-blue disabled:opacity-40"
                      name={id}
                      id={id}
                      onChange={(e) => {
                        setChecked((prev) => {
                          return e.target.checked
                            ? [...prev, e.target.value]
                            : prev.filter((i) => i !== e.target.value);
                        });

                        onChange(checked);
                      }}
                      {...(index === 0 ? { autoFocus: true } : {})}
                      disabled={disabled && !checked.includes(option)}
                      {...otherProps}
                      value={option}
                    />
                    <label htmlFor={id} className="text-sm">
                      {option}
                    </label>
                    {errors[name] && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors[name].message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuthCheckboxController;
