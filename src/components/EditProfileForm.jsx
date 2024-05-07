"use client";

import { useState } from "react";

import Button from "@/components/Button";
import Form from "@/components/Form";
import { useUser } from "@/context/UserContext";

const EditProfileForm = (props) => {
  const { user } = useUser();

  const [profileData, setProfileData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    profilePicture: user.profilePicture || null,
    bio: user.bio || "",
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    localStorage.removeItem("userProfileData");
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    props.isOpen(false);
  };

  return (
    <Form
      className="max-w-md mx-auto"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="space-y-10">
        <Form.Input
          name="first_name"
          value={profileData?.first_name}
          onChange={handleChange}
        >
          First Name
        </Form.Input>

        <Form.Input
          name="last_name"
          value={profileData?.last_name}
          onChange={handleChange}
        >
          Last Name
        </Form.Input>

        <Form.Input name="profilePicture" type="file" onChange={handleChange}>
          Profile Picture
        </Form.Input>

        <Form.Input
          name="bio"
          value={profileData?.bio}
          onChange={handleChange}
          rows={5}
        >
          Bio
        </Form.Input>
        <Button type="submit" as="button">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;
