import { useEffect, useState } from "react";
import Form, { Error } from "../Form";
import Button from "../Button";
import { useUser } from "@/context/UserContext";

const ShowcaseInput = ({ setLocalUser, handleChange }) => {
  const [shows, setShows] = useState([]);
  const [credits, setCredits] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setError] = useState({});

  const { user } = useUser();

  const add = () => {
    setError({});

    if (shows.length === 6) {
      setError({ message: "You can only add up to 6 episodes" });
      return;
    }

    if (!credits.includes(inputValue)) {
      setError({ message: "Please select one of your credits" });
      return;
    }

    setShows((prev) => [...prev, inputValue]);

    // Clear input when an entry is added
    setInputValue("");
    handleChange();
  };

  const remove = (show) => {
    setError({});
    setShows((prev) => prev.filter((i) => i !== show));
    handleChange();
  };

  useEffect(() => {
    if (user && user.shows) {
      setShows(JSON.parse(user.shows));
    }

    if (user && user.credits) {
      setCredits(() => {
        // Set credits to an array of titles for mapping
        return JSON.parse(user.credits).map((credit) => {
          return credit.name;
        });
      });
    }
  }, [user]);

  useEffect(() => {
    setLocalUser((prev) => {
      return { ...prev, showcase: shows };
    });
  }, [shows]);

  return (
    <div>
      <div className="mb-4">
        <p className="uppercase">Showcase</p>
        <span className="block text-sm text-queen-black/80">
          Add up to 6 of your credits
        </span>
      </div>

      {shows.length > 0 &&
        shows.map((show, index) => (
          <div
            key={index}
            className="flex items-center border-b border-queen-black/10 pb-5 my-5"
          >
            <span className="w-full block">{show}</span>
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

      <div className="flex items-center gap-x-6">
        <Form.Datalist
          name="showcase"
          value={inputValue}
          options={credits}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="button" variant="white" as="button" onClick={add}>
          Add
        </Button>
      </div>

      {errors?.message && <Error>{errors.message}</Error>}
    </div>
  );
};

export default ShowcaseInput;
