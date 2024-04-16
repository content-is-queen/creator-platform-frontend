"use client";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { inputStyles } from "@/components/Input";

import data from "@/data/opportunity_data.json";

const OpportunityForm = ({ type }) => {
  const fields = data[type].fields;
  const {
    user: { user_id },
  } = useAuth();

  const [errors, setErrors] = useState({});
  const form = useRef();

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleSubmit = async (fields, userId) => {
    const formData = new FormData(form.current);

    const keys = fields.reduce((acc, current) => {
      const { name, type, options } = current;

      if (type === "checkbox") {
        return [...acc, { [name]: options }];
      }

      return [...acc, name];
    }, "");

    const postData = { type: type, user_id: userId };

    keys.forEach((key) => {
      if (typeof key === "object") {
        const name = Object.keys(key)[0];

        postData[name] = [];

        key[name].forEach((option) => {
          if (formData.get(option) != null) {
            postData[name].push(option);
          }
        });

        return;
      }
      postData[key] = formData.get(key);
    });

    try {
      await API.post("/opportunities", postData);
      window.location = "/";
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setErrors({
        message: "Something went wrong...",
      });

      console.error(message);
    }
  };

  return (
    <Form
      ref={form}
      errors={errors}
      setErrors={setErrors}
      handleSubmit={() => handleSubmit(fields, user_id)}
    >
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

          if (as === "textarea") {
            return (
              <div key={name}>
                <label for={name}>{children}</label>
                <textarea
                  name={name}
                  className={twMerge(inputStyles.input)}
                  required
                />
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

      <Button as="button" type="submit" className="mt-8">
        Submit
      </Button>
    </Form>
  );
};

export default OpportunityForm;
