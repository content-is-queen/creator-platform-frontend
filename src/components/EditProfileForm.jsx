"use client";

import { useState, useEffect } from "react";
import { inputStyles } from "./Input";

import { selectAuth } from "@/app/redux/features/profile/authSlice";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/app/redux/features/profile/profileSlice";

import Button from "@/components/Button";
import Form from "@/components/Form";

const EditProfileForm = () => {
  const { userProfileData } = useSelector((state) => state.profile);

  const [profileData, setProfileData] = useState({
    first_name: userProfileData.message?.first_name || "",
    last_name: userProfileData.message?.last_name || "",
    profilePicture: userProfileData.message?.profilePicture || null,
    bio: userProfileData.message?.bio || "",
    role: userProfileData.message?.role,
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
    const formData = new FormData();
    localStorage.removeItem("userProfileData");
    e.preventDefault();
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    window.location.reload();
  };

  return (
    <Form
      className="max-w-md mx-auto"
      onSubmit={() => handleSubmit}
      encType="multipart/form-data"
    >
      <div className="space-y-10">
        <div className="relative z-0 w-full group">
          <label for="displayName">First name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={profileData?.first_name}
            onChange={handleChange}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>
        <div className="relative z-0 w-full group">
          <label for="displayName">Last name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={profileData?.last_name}
            onChange={handleChange}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>
        <div className="relative z-0 w-full group">
          <label for="profilePicture">Profile picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>

        <div className="relative z-0 w-full group">
          <label for="bio">Bio</label>
          <textarea
            onChange={handleChange}
            className={inputStyles.input}
            id="bio"
            name="bio"
            rows={5}
            value={profileData?.bio}
          />
        </div>
        <Button type="submit" as="button">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;
