"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import { useUser } from "@/context/UserContext";
import useToken from "@/hooks/useToken";

import Form from "@/components/Form";
import Button from "@/components/Button";

const EditProfile = () => {
  const [errors, setError] = useState({});
  const { user: userDefaults } = useUser();
  const token = useToken();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    imageUrl: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setUser((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    setUser({
      first_name: userDefaults?.first_name,
      last_name: userDefaults?.last_name,
      imageUrl: userDefaults?.imageUrl,
      bio: userDefaults?.bio,
    });
  }, [userDefaults]);

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await API(
        `/auth/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
        formData
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <Form
      className="mx-auto"
      errors={errors}
      setError={setError}
      handleSubmit={handleSubmit}
    >
      <div className="space-y-10">
        <Form.Input
          name="first_name"
          value={user?.first_name}
          onChange={handleChange}
        >
          First Name
        </Form.Input>

        <Form.Input
          name="last_name"
          value={user?.last_name}
          onChange={handleChange}
        >
          Last Name
        </Form.Input>

        <Form.Input name="imageUrl" type="file" onChange={handleChange}>
          Profile Picture
        </Form.Input>

        <Form.Input
          name="bio"
          value={user?.bio}
          rows={5}
          onChange={handleChange}
        >
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
