"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";
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
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "showcase" || key === "credits") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    try {
      const res = await API.post(`/auth/user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setUser({ ...user, ...formData });

        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            ...user,
            ...formData,
          })
        );

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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full"
          >
            First Name
          </Form.Input>
          <Form.Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full"
          >
            Last Name
          </Form.Input>
        </div>
        <div className="space-y-10">
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
              <CreditsInput
                setUpdated={setUpdated}
                setFormData={setFormData}
                handleChange={handleChange}
              />
              <ShowcaseInput
                setUpdated={setUpdated}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            </>
          )}
        </div>

        <Button type="submit" as="button" disabled={!updated}>
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
