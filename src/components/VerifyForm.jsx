"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";

const Input = ({ value, onChange }) => (
  <input
    type="text"
    onChange={onChange}
    value={value}
    className="max-w-12 h-12 text-center border-queen-black/80 border-2 bg-transparent"
  />
);

const VerifyForm = () => {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedQuery = searchParams.get("otp");

  const handleChange = (e, inputName) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName]: value,
    }));
  };

  const handleSubmit = async () => {
    const otp = Object.values(formData).join("");
    try {
      // const response = await API.post(
      //   "/auth/verify",
      //   { email, uid, otp },
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // const { message } = response.data;
      // console.log(response);
      // setSuccess({ message: message });
      // router.push("/login");
    } catch (error) {
      console.log(error);
      setError({ message: "Sorry we were unable to verify your email" });
      console.error(message);
    }
  };

  useEffect(() => {
    // If otp has length of 5, update the form data with otp characters
    if (parsedQuery && parsedQuery.length === 5) {
      const otpCharacters = parsedQuery.split("");
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        otpCharacters.forEach((character, index) => {
          newFormData[`input${index}`] = character;
        });
        return newFormData;
      });
    }
  }, []);

  return (
    <>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 5 }).map((value, index) => (
          <Input
            key={index}
            onChange={(e) => handleChange(e, `input${index}`)}
            value={formData[`input${index}`]}
          />
        ))}
      </div>
      <Button type="button" onClick={handleSubmit} as="button" className="mt-8">
        Verify
      </Button>
    </>
  );
};

export default VerifyForm;
