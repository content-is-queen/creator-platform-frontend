"use client";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

const EditProfile = () => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setUserProfile((prevProfileData) => ({
      ...prevProfileData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });
  };

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="first_name" value={user?.first_name}>
          First Name
        </Form.Input>

        <Form.Input name="last_name" value={user?.last_name}>
          Last Name
        </Form.Input>

        <Form.Input name="profilePicture" type="file">
          Profile Picture
        </Form.Input>

        <Form.Input name="bio" value={user?.bio} rows={5}>
          Bio
        </Form.Input>

        <Button type="submit" as="button">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
