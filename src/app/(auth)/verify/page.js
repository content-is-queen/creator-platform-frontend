"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Secure from "@/utils/SecureLs";
import { useEffect, useState } from "react";

const Input = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="max-w-12 h-12 text-center border-queen-black/80 border-2 bg-transparent"
  />
);

const Verify = () => {
  const [userInfo, setUserInfo] = useState(null);
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

  const handleSubmit = () => {
    const otp= Object.values(formData).join("");
    console.log(otp,"LLLLLLLLLLL");
  };

  useEffect(()=>{
    const data = Secure.get("userInfo");
    setUserInfo(data);
  },[]);
  return <div className="text-center">
    <Heading size="3xl" className="mb-2">
      Verify your email address
    </Heading>
    <p className="mb-6">
      We're sure you're you, but we still need to verify that.
    </p>
    <div className="flex gap-2 justify-center">
        <Input value={formData.input1} onChange={(e) => handleChange(e, "input1")} />
        <Input value={formData.input2} onChange={(e) => handleChange(e, "input2")} />
        <Input value={formData.input3} onChange={(e) => handleChange(e, "input3")} />
        <Input value={formData.input4} onChange={(e) => handleChange(e, "input4")} />
        <Input value={formData.input5} onChange={(e) => handleChange(e, "input5")} />
    </div>
    <Button type="button" onClick={handleSubmit} as="button" className="mt-8">
      Verify
    </Button>
  </div>
}
;

export default Verify;
