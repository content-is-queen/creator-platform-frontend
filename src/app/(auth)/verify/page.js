"use client";

import API from "@/api/api";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Secure from "@/utils/SecureLs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Input = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="max-w-12 h-12 text-center border-queen-black/80 border-2 bg-transparent"
  />
);

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedQuery = searchParams?.get("otp");
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });
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
      const response = await API("/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userInfo, otp }),
      });
      const { message } = response.data;
      router.push("/login");
      toast.success(message);
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Try again");
    }
  };

  useEffect(() => {
    const data = Secure.get("userInfo");
    setUserInfo(data);
  }, []);

  useEffect(() => {
    // If otp has length of 5, update the form data with otp characters
    if (typeof parsedQuery === "string" && parsedQuery?.length === 5) {
      const otpCharacters = parsedQuery.split("");
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        otpCharacters.slice(0, 5).forEach((character, index) => {
          newFormData[`input${index + 1}`] = character;
        });
        return newFormData;
      });
    }
  }, []);

  return (
    <div className="text-center">
      <Heading size="3xl" className="mb-2">
        Verify your email address
      </Heading>
      <p className="mb-6">
        We're sure you're you, but we still need to verify that.
      </p>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((index) => (
          <Input
            key={index}
            value={formData[`input${index}`]}
            onChange={(e) => handleChange(e, `input${index}`)}
          />
        ))}
      </div>
      <Button type="button" onClick={handleSubmit} as="button" className="mt-8">
        Verify
      </Button>
    </div>
  );
};
export default Verify;
