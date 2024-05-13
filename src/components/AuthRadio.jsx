import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";

import { inputStyles } from "./AuthInput";

const AuthRadio = ({ name, errors, control, options }) => (
  <div className="relative z-0 w-full group">
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, ...otherProps } }) => (
        <>
          <div>
            <div className="space-y">
              {options.map((option) => {
                const id = option.replaceAll(" ", "-").toLowerCase();
                return (
                  <div
                    className="inline-flex items-center gap-3 w-full"
                    key={option}
                  >
                    <input
                      type="radio"
                      className={twMerge(inputStyles.input, "p-1 !w-5 !h-5")}
                      name={id}
                      id={id}
                      value={option}
                      onChange={onChange}
                      {...otherProps}
                    />
                    <label for={id} className="text-sm">
                      {option}
                    </label>
                    {errors[name] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    />
  </div>
);

export default AuthRadio;
