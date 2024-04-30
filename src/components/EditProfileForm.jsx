"use client";

import { useState } from "react";

import { selectAuth } from "@/app/redux/features/profile/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateProfile,
} from "@/app/redux/features/profile/profileSlice";

import Button from "@/components/Button";
import Form from "@/components/Form";

const EditProfileForm = (props) => {
  const { userProfileData, loading } = useSelector((state) => state.profile);
  const { token } = useSelector(selectAuth);
  const [profileData, setProfileData] = useState({
    first_name: userProfileData.message?.first_name || "",
    last_name: userProfileData.message?.last_name || "",
    profilePicture: userProfileData.message?.profilePicture || null,
    bio: userProfileData.message?.bio || "",
    role: userProfileData.message?.role,
  });
  const dispatch = useDispatch();
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
    dispatch(updateProfile({ token, formData }));
    dispatch(getUserProfile(token));
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
