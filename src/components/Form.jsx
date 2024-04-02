"use client";

import Text from "@/components/Text";
import { inputStyles } from "./Input";
import { twMerge } from "tailwind-merge";

const Form = ({ fields }) => {
  return (
    <div className="space-y-10">
      {fields.map(({ children, as, type, name, options }) => {
        if (as === "select") {
          return (
            <div key={name}>
              <label for={name}>{children}</label>
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
        }

        if (type === "checkbox") {
          return (
            <div key={name}>
              <Text className="mb-4">{children}</Text>
              <div className="space-y">
                {options.map((option) => (
                  <div
                    className="inline-flex items-center gap-3 w-full"
                    key={option}
                  >
                    <input
                      type={type}
                      className={twMerge(inputStyles.input, "p-1")}
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
        }
        return (
          <div key={name}>
            <label for={name}>{children}</label>
            <input
              type={type}
              className="py-3 placeholder:text-queen-black/40 block px-0 w-full text-queen-black bg-transparent border-0 border-b-2 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer"
              name={name}
              id={name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Form;
