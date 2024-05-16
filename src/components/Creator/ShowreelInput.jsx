import { useEffect, useState } from "react";

import Form from "@/components/Form";
import Button from "../Button";
import { Error } from "@/components/Form";
import local from "next/font/local";

const ShowreelInput = ({ setLocalUser, setUpdated, localUser }) => {
  const [inputValue, setInputValue] = useState(localUser?.showreel || "");
  const [status, setStatus] = useState("");
  const [errors, setError] = useState({});

  const add = () => {
    setError({});
    setUpdated(true);
    setStatus("added");

    if (inputValue.trim("").length === 0) {
      setError({ message: "Please enter a valid url" });
      return;
    }
  };

  const remove = () => {
    setInputValue("");
    setUpdated(true);
    setStatus("removed");
  };

  useEffect(() => {
    setLocalUser((prev) => ({ ...prev, ["showreel"]: inputValue }));
  }, [status]);

  return (
    <div>
      <div className="mb-4">
        <p className="uppercase">Showreel</p>
        <span className="block text-sm text-queen-black/80">
          Insert a link to your Spotify or Soundcloud showreel
        </span>
      </div>
      {localUser?.showreel ? (
        <div className="flex items-center border-b border-queen-black/10 pb-5">
          <span className="w-full block">{inputValue}</span>
          <Button type="button" variant="white" as="button" onClick={remove}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-6">
          <Form.Input
            name="showreel"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://soundcloud.com/djnairaa/season3"
            value={inputValue}
            className="w-full"
          />
          <Button type="button" variant="white" as="button" onClick={add}>
            Add
          </Button>
        </div>
      )}
      {errors?.message && <Error>{errors.message}</Error>}
    </div>
  );
};

export default ShowreelInput;
