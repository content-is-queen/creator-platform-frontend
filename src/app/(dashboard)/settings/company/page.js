"use client";

import { useEffect, useState } from "react";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

const Company = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    organization_name: user?.name || "",
    organization_logo: null,
  });
  const { token } = useToken();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "organization_logo" ? files[0] : value;

    const updatedFormData = { ...formData, [name]: newValue };

    const checkIsEmpty = (str) => str.trim().length === 0;

    const isEmpty =
      checkIsEmpty(updatedFormData.organization_name) ||
      !updatedFormData.organization_logo;

    setUpdated(!isEmpty);
    setFormData(updatedFormData);
  };
  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `organization_logo/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess({});
    try {
      let imageUrl = null;

      if (formData.organization_logo) {
        imageUrl = await handleFileUpload(formData.organization_logo);
      }
      const dataToSubmit = {
        organization_name: formData.organization_name,
        ...(imageUrl && { organization_logo: imageUrl }),
      };
      const response = await API.put(`/admin/company`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
        setUser({ ...user, organization_name: formData.organization_name });
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

  useEffect(() => {
    setFormData({
      organization_name: user?.organization_name || "",
      organization_logo: user?.organization_logo || null,
    });
  }, [user]);
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="organization_name"
          type="text"
          value={formData.organization_name}
          onChange={handleChange}
          className="relative"
        >
          Company Name
        </Form.Input>
        <Form.Input
          name="organization_logo"
          type="file"
          onChange={handleChange}
          accept="image/*"
        >
          Profile Picture
        </Form.Input>
        <Button
          type="submit"
          as="button"
          onClick={handleSubmit}
          {...(!updated && { disabled: false })}
        >
          {loading && <Button.Spinner />} Update Company Info
        </Button>
      </div>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
      {success?.message && (
        <div className="border border-green-700 bg-green-100 text-green-700 text-sm mt-4 py-2 px-4">
          <p>{success.message}</p>
        </div>
      )}
    </Form>
  );
};

export default Company;
