"use client";

import { useState, useEffect } from "react";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";

const General = () => {
  const { user, setUser } = useUser();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState({});

  const [formData, setFormData] = useState({
    email: user?.email || "",
  });

  useEffect(() => {
    setFormData({
      email: user?.email || "",
    });
  }, [user]);

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
      const response = await API.post("/auth/emailupdate", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser({ ...user, ...formData });
      if (response.status === 200) {
        setSuccess({
          message: "Email updated successfully",
        });
      }
    } catch (error) {
      setError({
        message: error?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="email" value={formData.email} onChange={handleChange}>
          Email
        </Form.Input>

        <Button
          type="submit"
          as="button"
          onClick={handleSubmit}
          variant="blue"
          {...(!updated && { disabled: true })}
        >
          {loading && <Button.Spinner />} Save Changes
        </Button>
      </div>
      {error?.message && <Form.Error>{error.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default General;
