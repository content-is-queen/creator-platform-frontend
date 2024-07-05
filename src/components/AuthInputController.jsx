import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const inputStyles = {
  input:
    "placeholder:uppercase py-3 placeholder:text-queen-black/40 px-0 text-queen-black !bg-transparent border-0 border-b border-queen-black appearance-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-queen-blue peer",
  label:
    "uppercase peer-focus-visible:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus-visible:start-0 rtl:peer-focus-visible:translate-x-1/4 peer-focus-visible:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus-visible:scale-75 peer-focus-visible:-translate-y-6 uppercase",
};

const AuthInputController = ({
  children,
  name,
  className,
  rules,
  errors,
  control,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="relative z-0 w-full group">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <>
            <input
              type={
                name === "password" && !isPasswordVisible ? "password" : "text"
              }
              className={clsx(
                twMerge(
                  inputStyles.input,
                  errors[name] ? "border-red-600" : "border-queen-black",
                  className
                )
              )}
              placeholder=""
              id={name}
              {...field}
              {...otherProps}
            />
            <label htmlFor={name} className={inputStyles.label}>
              {children}
            </label>
            {name === "password" && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
            {errors[name] && (
              <p className="text-sm text-red-600 mt-1">
                {errors[name].message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default AuthInputController;
