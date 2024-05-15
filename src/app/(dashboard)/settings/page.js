"use client";

import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";
import { useState } from "react";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const General = () => {
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState({});

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    !updated && setUpdated(true);

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError({});
    setSuccess({});
    try {
      const response = await API("/auth/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setUser({ ...user, username: formData.username, email: formData.email });
      if (response.status === 200) {
        setSuccess({
          message: "Settings updated successfully",
        });
      }
    } catch (error) {
      setError({
        message: error?.message || "Something went wrong. User sign up failed.",
      });
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="username"
          value={formData.username}
          onChange={handleChange}
        >
          Username
        </Form.Input>

        <Form.Input name="email" value={formData.email} onChange={handleChange}>
          Email
        </Form.Input>

        <Button
          type="submit"
          as="button"
          onClick={handleSubmit}
          {...(!updated && { disabled: true })}
        >
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
      {errors?.message && <Form.Error>{errors.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default General;
