import { useEffect, useState } from "react";
import Form, { Error } from "../Form";
import Button from "../Button";

const CreditsInput = ({ setLocalUser, localUser, handleChange }) => {
  const [credits, setCredits] = useState(localUser.profile_meta?.credits || []);
  const [inputValue, setInputValue] = useState({ episode_link: "", role: "" });
  const [errors, setError] = useState({});

  const add = () => {
    setError({});

    // Check if both fields contain a value
    if (
      inputValue.episode_link.trim("").length === 0 ||
      inputValue.role.trim("").length === 0
    ) {
      setError({ message: "Please fill in both fields" });
      return;
    }

    setCredits((prev) => [...prev, inputValue]);

    // Clear input when an entry is added
    setInputValue({ episode_link: "", role: "" });
    handleChange();
  };

  const remove = (episode_link) => {
    setError({});
    setCredits((prev) => prev.filter((i) => i.episode_link !== episode_link));
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
        credits.map(({ episode_link, role }, index) => (
          <div
            key={index}
            className="flex items-center border-b border-queen-black/10 pb-5 my-5"
          >
            <span className="w-full block">
              {episode_link} - {role}
            </span>
            <Button
              type="button"
              variant="white"
              as="button"
              onClick={() => {
                remove(episode_link);
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
            value={inputValue?.episode_link}
            placeholder="Episode Link"
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, ["episode_link"]: e.target.value }))
            }
            label="sm"
          >
            Episode Link
          </Form.Input>
          <Form.Input
            className="w-full"
            value={inputValue?.role}
            placeholder="Role"
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
