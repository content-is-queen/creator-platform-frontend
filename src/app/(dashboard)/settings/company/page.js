"use client";

import { useState } from "react";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.config";

const Company = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company_profile_picture: null,
  });
  const { token } = useToken();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "company_profile_picture" ? files[0] : value;

    const updatedFormData = { ...formData, [name]: newValue };

    const checkIsEmpty = (str) => str.trim().length === 0;

    const isEmpty =
      checkIsEmpty(updatedFormData.name) ||
      !updatedFormData.company_profile_picture;

    setUpdated(!isEmpty);
    setFormData(updatedFormData);
  };
  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `company_profile_pictures/${file.name}`);
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

      if (formData.company_profile_picture) {
        imageUrl = await handleFileUpload(formData.company_profile_picture);
      }
      const dataToSubmit = {
        name: formData.name,
        ...(imageUrl && { company_profile_picture: imageUrl }),
      };
      const response = await API.put(`/admin/company`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
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
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="relative"
        >
          Company Name
        </Form.Input>
        <Form.Input
          name="company_profile_picture"
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
