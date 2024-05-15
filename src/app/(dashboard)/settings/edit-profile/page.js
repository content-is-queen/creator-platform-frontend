"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import { getUserProfile, useUser } from "@/context/UserContext";
import useToken from "@/hooks/useToken";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { user: userDefaults, setUser } = useUser();
  const { token } = useToken();
  const router = useRouter();

  const [user, setLocalUser] = useState({
    first_name: "",
    last_name: "",
    imageUrl: "",
    bio: "",
  });

  const handleChange = (e) => {
    !updated && setUpdated(true);
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setLocalUser((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (userDefaults)
      setLocalUser({
        first_name: userDefaults?.first_name,
        last_name: userDefaults?.last_name,
        imageUrl: userDefaults?.imageUrl,
        bio: userDefaults?.bio,
      });
  }, [userDefaults]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await API(`/auth/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        const userProfile = await getUserProfile();

        if (!userProfile) {
          setError({
            message: "Something went wrong when updating your profile",
          });

          throw new Error("Something went wrong when updating the user profile");
        }

        localStorage.removeItem("userProfile");
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        setUser({ ...userDefaults, ...userProfile });
        router.push("/profile");
      } else {
        setError({ message: res.message });
      }
    } catch (err) {
      console.error(err);
      setError({ message: err.message });
    } finally {
      setLoading(false);
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

        <Button type="submit" as="button" {...(!updated && { disabled: true })}>
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
