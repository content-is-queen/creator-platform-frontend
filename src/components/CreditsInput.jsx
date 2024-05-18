import { useEffect, useState } from "react";

import Form, { Error } from "./Form";
import Button from "./Button";

const CreditsInput = ({ setLocalUser, localUser, handleChange }) => {
  const [credits, setCredits] = useState(localUser.profile_meta?.credits || []);
  const [inputValue, setInputValue] = useState({ show: "", role: "" });
  const [errors, setError] = useState({});

  const add = (e) => {
    setError({});

    // Check if both fields contain a value
    // Object.values(inputValue).some((value) => {
    //   if (value.trim("").length === 0) {
    //     setError({ message: "Please fill in both fields" });
    //   }
    // });

    setCredits((prev) => [...prev, inputValue]);

    // Clear input when an entry is added
    setInputValue({ show: "", role: "" });
    handleChange();
  };

  const remove = (show) => {
    setError({});
    setCredits((prev) => prev.filter((i) => i.show !== show));
    handleChange();
  };

  useEffect(() => {
    setLocalUser((prev) => {
      const newObj = prev;
      const { profile_meta } = newObj;
      newObj.profile_meta = { ...profile_meta, credits: credits };
      return newObj;
    });
  }, [credits]);

  return (
    <div>
      <div>
        <p className="uppercase mb-4">Credits</p>
      </div>

      {credits.length > 0 &&
        credits.map(({ show, role }, index) => (
          <div
            key={index}
            className="flex items-center border-b border-queen-black/10 pb-5 my-5"
          >
            <span className="w-full block">
              {show} - {role}
            </span>
            <Button
              type="button"
              variant="white"
              as="button"
              onClick={() => {
                remove(show);
              }}
            >
              Remove
            </Button>
          </div>
        ))}

      <div className="flex items-end gap-x-6">
        <div className="space-y-4 w-full">
          <Form.Input
            className="w-full"
            value={inputValue?.show}
            placeholder="Feel better, live more"
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, ["show"]: e.target.value }))
            }
            label="sm"
          >
            Show
          </Form.Input>
          <Form.Input
            className="w-full"
            value={inputValue?.role}
            placeholder="Host"
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, ["role"]: e.target.value }))
            }
            label="sm"
          >
            Role
          </Form.Input>
        </div>
        <Button type="button" variant="white" as="button" onClick={add}>
          Add
        </Button>
      </div>

      {errors?.message && <Error>{errors.message}</Error>}
    </div>
  );
};
export default CreditsInput;
