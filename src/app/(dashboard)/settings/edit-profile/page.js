"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import { getUserProfile, useUser } from "@/context/UserContext";
import useToken from "@/hooks/useToken";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ShowcaseInput from "@/components/ShowcaseInput";
import ShowreelInput from "@/components/Creator/ShowreelInput";
import CreditsInput from "@/components/CreditsInput";

const EditProfile = () => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [localUser, setLocalUser] = useState({});

  const { user, setUser } = useUser();
  const { token } = useToken();
  const router = useRouter();

  const handleChange = (e) => {
    !updated && setUpdated(true);

    // Prevent checking values updated by a button
    if (e?.target) {
      const { name, value, files } = e.target;
      const newValue = files ? files[0] : value;

      setLocalUser((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  useEffect(() => {
    setLocalUser({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      imageUrl: user?.imageUrl || "",
      bio: user?.bio || "",
      profile_meta: user?.profile_meta || {},
    });
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(localUser).forEach(([key, value]) => {
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

          throw new Error(
            "Something went wrong when updating the user profile"
          );
        }

        localStorage.removeItem("userProfile");
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        setUser({ ...user, ...userProfile });
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
        <div className="flex gap-x-6 w-full">
          <Form.Input
            name="first_name"
            value={localUser?.first_name}
            onChange={handleChange}
            className="w-full"
          >
            First Name
          </Form.Input>

          <Form.Input
            name="last_name"
            value={localUser?.last_name}
            onChange={handleChange}
            className="w-full"
          >
            Last Name
          </Form.Input>
        </div>

        <div className="space-y-10">
          <Form.Input name="imageUrl" type="file" onChange={handleChange}>
            Profile Picture
          </Form.Input>

          <Form.Input
            name="bio"
            value={localUser?.bio}
            rows={5}
            onChange={handleChange}
          >
            Bio
          </Form.Input>
        </div>

        <div className="space-y-10">
          <ShowreelInput
            setUpdated={setUpdated}
            setLocalUser={setLocalUser}
            localUser={localUser}
            handleChange={handleChange}
          />

          <ShowcaseInput
            setUpdated={setUpdated}
            setLocalUser={setLocalUser}
            localUser={localUser}
            handleChange={handleChange}
          />

          <CreditsInput
            setUpdated={setUpdated}
            setLocalUser={setLocalUser}
            localUser={localUser}
            handleChange={handleChange}
          />
        </div>

        <Button type="submit" as="button" {...(!updated && { disabled: true })}>
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
