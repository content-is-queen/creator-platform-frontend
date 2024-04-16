"use client";

import API from "@/api/api";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { inputStyles } from "@/components/Input";

import opportunityData from "@/data/opportunity_data.json";

const EditOpportunityForm = (props) => {
  const { type, opportunity_id } = props;
  const data = opportunityData[type];

  const [updatedFields, setUpdatedFields] = useState({});
  const [errors, setErrors] = useState({});

  const changeHandler = (fieldName, value) => {
    setUpdatedFields({ ...updatedFields, [fieldName]: value });
  };

  const handleSubmit = async (fields, opportunityId) => {
    const postData = { type: type, opportunity_id: opportunityId, ...fields };

    try {
      await API.put(`/opportunities/${opportunityId}`, postData);
      window.location.reload();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setErrors({
        message: "There was a problem updating your opportunity.",
      });
      console.error(message);
    }
  };

  return (
    <Form
      errors={errors}
      setErrors={setErrors}
      handleSubmit={() => handleSubmit(updatedFields, opportunity_id)}
    >
      <div className="space-y-10">
        {data.fields.map(({ children, name, type, options, as }) => {
          const value = props[name];

          if (as === "select") {
            return (
              <div key={name}>
                <label for={name}>{children}</label>
                <select
                  className="w-full"
                  name={name}
                  id={name}
                  onChange={(e) => changeHandler(name, e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {options.map((option, index) => (
                    <option
                      key={`${option}-${index}`}
                      {...(value === option && { selected: true })}
                    >
                      {option}
                    </option>
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
                  rows={6}
                  className={twMerge(inputStyles.input)}
                  value={updatedFields[name] || value}
                  onChange={(e) => changeHandler(name, e.target.value)}
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
                  {options.map((option) => {
                    const selectedFields =
                      name in updatedFields ? updatedFields[name] : value;

                    return (
                      <div
                        className="inline-flex items-center gap-3 w-full"
                        key={option}
                      >
                        <input
                          type={type}
                          className={twMerge(inputStyles.input, "p-1")}
                          name={option}
                          id={option}
                          onChange={() => {
                            if (name in updatedFields) {
                              if (updatedFields[name].includes(option)) {
                                setUpdatedFields({
                                  ...updatedFields,
                                  [name]: updatedFields[name].filter(
                                    (i) => i !== option
                                  ),
                                });

                                return;
                              }

                              setUpdatedFields({
                                ...updatedFields,
                                [name]: [...updatedFields[name], option],
                              });
                            } else {
                              setUpdatedFields({
                                ...updatedFields,
                                [name]: [...value, option],
                              });
                            }
                          }}
                          {...(selectedFields?.includes(option) && {
                            checked: true,
                          })}
                        />
                        <label for={name} className="text-sm">
                          {option}
                        </label>
                      </div>
                    );
                  })}
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
                value={updatedFields[name] || value}
                onChange={(e) => changeHandler(name, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <Button as="button" type="submit" className="mt-8">
        Update
      </Button>
    </Form>
  );
};

export default EditOpportunityForm;
