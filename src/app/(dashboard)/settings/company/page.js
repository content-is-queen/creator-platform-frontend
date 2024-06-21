"use client";

import { useState, useEffect } from "react";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Company = () => {
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: user?.organizationName || "",
    organizationBio: user?.organizationBio || "",
  });

  useEffect(() => {
    setFormData({
      organizationName: user?.organizationName || "",
      organizationBio: user?.organizationBio || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };

    const checkIsEmpty = (str) => str.trim().length === 0;

    const isEmpty =
      checkIsEmpty(updatedFormData.organizationName) &&
      updatedFormData.organizationBio;
    setUpdated(!isEmpty);
    setFormData(updatedFormData);
  };

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `organizationLogo/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess({});

    try {
      const dataToSubmit = {
        organizationName: formData.organizationName,
        organizationBio: formData.organizationBio,
      };

      const response = await API.put("/admin/company", dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        setUser({
          ...user,
          organizationName: formData.organizationName,
          organizationBio: formData.organizationBio,
        });

        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            ...user,
            organizationName: formData.organizationName,
            organizationBio: formData.organizationBio,
          })
        );
        setSuccess({ message: "Company info updated successfully" });
      } else {
        setErrors({
          message: response.message || "Something went wrong. Update failed.",
        });
      }
    } catch (error) {
      setErrors({
        message:
          error.response?.data.message ||
          "Something went wrong. Update failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="organizationName"
          type="text"
          value={formData.organizationName}
          onChange={handleChange}
          className="relative"
        >
          Company Name
        </Form.Input>
        <Form.Input
          name="organizationBio"
          type="text"
          value={formData.organizationBio}
          onChange={handleChange}
          className="relative"
        >
          Company Bio
        </Form.Input>
        <Button
          type="submit"
          as="button"
          onClick={handleSubmit}
          disabled={!updated}
        >
          {loading && <Button.Spinner />} Update Company Info
        </Button>
      </div>
      {errors?.message && <Form.Error>{errors.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default Company;
