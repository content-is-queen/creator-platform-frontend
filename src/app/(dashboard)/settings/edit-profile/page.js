"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import fieldsData from "@/data/signup_form_data.json";

import Form from "@/components/Form";
import Button from "@/components/Button";
import CreditsInput from "@/components/Creator/CreditsInput";
import ProfilePhotoUpdateModal from "@/components/ProfilePhotoUpdateModal";
import Text from "@/components/Text";

const interestOptions = fieldsData
  .filter((item) => item.id === "creator")
  .map((item) => item.steps["4"].fields[0].options)
  .flat();

const goalsOptions = fieldsData
  .filter((item) => item.id === "creator")
  .map((item) => item.steps["3"].fields[0].options)
  .flat();

const EditProfile = () => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    goals: "",
    interests: [],
  });

  const { user, setUser } = useUser();
  const { token } = useAuth();

  // Handle text input changes
  const handleChange = (e) => {
    !updated && setUpdated(true);

    if (e?.target) {
      const { name, value, type, checked } = e.target;

      // Handle checkbox inputs
      if (type === "checkbox") {
        let updatedInterests = formData.interests;

        if (checked) {
          // Prevent adding more than 3 interests
          if (updatedInterests.length < 3) {
            updatedInterests = [...updatedInterests, value];
          }
        } else if (type === "radio" && name === "goals") {
          setFormData((prev) => ({
            ...prev,
            goals: value,
          }));
        } else {
          updatedInterests = updatedInterests.filter(
            (interest) => interest !== value
          );
        }

        setFormData((prev) => ({
          ...prev,
          interests: updatedInterests,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
      goals: user?.goals || "",
      interests: user?.interests || [],
    });
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "showcase" || key === "credits") {
        data.append(key, JSON.stringify(value));
      } else if (key === "interests") {
        // Append each interest as a separate field
        value.forEach((interest) => {
          data.append("interests[]", interest);
        });
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
        const { data } = res.data;
        setUser({ ...user, ...data });
        setSuccess({ message: res.data.message });
        setUpdated(false);
      } else {
        setError({ message: res.data.message });
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
      error={error}
      setError={setError}
      setSuccess={setSuccess}
      success={success}
      handleSubmit={handleSubmit}
    >
      <div className="space-y-10">
        <ProfilePhotoUpdateModal />

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

        {user?.role === "creator" && (
          <>
            <div>
              <Text className="mb-4 uppercase">Goals</Text>
              {goalsOptions.map((option) => (
                <div
                  key={option}
                  className="inline-flex items-center gap-x-2 w-full"
                >
                  <input
                    type="radio"
                    id={option}
                    value={option}
                    name="goals"
                    checked={formData.goals === option}
                    onChange={handleChange}
                  />
                  <label htmlFor={option} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <Text className="mb-4 uppercase">Interests</Text>
              <div className="space-y grid grid-cols-2 gap-x-6 gap-y-1">
                {interestOptions.map((option) => (
                  <div
                    key={option}
                    className="inline-flex items-center gap-x-3 w-full"
                  >
                    <input
                      type="checkbox"
                      id={option}
                      value={option}
                      name="interests"
                      checked={formData.interests.includes(option)}
                      onChange={handleChange}
                      className="p-1 w-4 h-4 border-queen-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-queen-blue/80 focus-visible:rounded-sm rounded-sm disabled:opacity-40"
                      disabled={
                        !formData.interests.includes(option) &&
                        formData.interests.length >= 3
                      }
                    />
                    <label htmlFor={option} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <CreditsInput
              setUpdated={setUpdated}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </>
        )}

        <Button type="submit" as="button" variant="blue" disabled={!updated}>
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
