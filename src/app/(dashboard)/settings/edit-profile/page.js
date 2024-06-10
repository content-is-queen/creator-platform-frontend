"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/api";
import { getUserProfile, useUser } from "@/context/UserContext";
import useToken from "@/hooks/useToken";

import Form from "@/components/Form";
import Button from "@/components/Button";
import ShowcaseInput from "@/components/Creator/ShowcaseInput";
import CreditsInput from "@/components/Creator/CreditsInput";

const EditProfile = () => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({});

  const { user, setUser } = useUser();
  const { token } = useToken();
  const router = useRouter();

  const handleChange = (e) => {
    !updated && setUpdated(true);

    if (e?.target) {
      const { name, value, files } = e.target;
      const newValue = files ? files[0] : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  useEffect(() => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      imageUrl: user?.imageUrl || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const dataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "showcase" || key === "credits") {
        dataToSend.append(key, JSON.stringify(value));
      } else {
        dataToSend.append(key, value);
      }
    });

    try {
      const res = await API.put(`/auth/user`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        // Update local user profile on successful update
        const userProfile = await getUserProfile({ token });
        localStorage.removeItem("userProfile");
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        setUser({ ...user, ...userProfile });

        router.push("/profile");
      } else {
        setError({ message: res.data.message });
      }
    } catch (err) {
      console.error(err);
      setError({ message: err.message || "Server error" });
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
            value={formData.first_name}
            onChange={handleChange}
            className="w-full"
          >
            First Name
          </Form.Input>
          <Form.Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full"
          >
            Last Name
          </Form.Input>
        </div>
        <div className="space-y-10">
          <Form.Input
            name="imageUrl"
            type="file"
            onChange={handleChange}
            accept="image/*"
          >
            Profile Picture
          </Form.Input>
          <Form.Input
            name="bio"
            value={formData.bio}
            rows={5}
            onChange={handleChange}
          >
            Bio
          </Form.Input>
        </div>

        <div className="space-y-10">
          {user && user.role === "creator" && (
            <>
              <ShowcaseInput
                setUpdated={setUpdated}
                setFormData={setFormData}
                handleChange={handleChange}
              />

              <CreditsInput
                setUpdated={setUpdated}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            </>
          )}
        </div>

        <Button type="submit" as="button" {...(!updated && { disabled: true })}>
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
