"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import API from "@/api/api";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Company = () => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [newData, setNewData] = useState({});

  const { user, setUser } = useUser();
  const { token } = useAuth();

  useEffect(() => {
    setFormData({
      organizationName: user?.organizationName || "",
      organizationBio: user?.organizationBio || "",
      organizationLogo: user?.organizationLogo || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setImage(URL.createObjectURL(files[0]));
      setNewData((prev) => {
        return { ...prev, organizationLogo: files[0] };
      });
    } else {
      setNewData((prev) => {
        return { ...prev, [name]: value };
      });
    }

    setUpdated(formData !== newData || Object.keys(newData).length > 0);
  };

  const uploadFile = async (file) => {
    const profilePhotoRef = ref(storage, `organizationLogo/${file.name}`);

    await uploadBytes(profilePhotoRef, file);
    return await getDownloadURL(profilePhotoRef);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError({});
    setSuccess({});

    try {
      if (newData?.organizationLogo) {
        const organizationLogo = await uploadFile(newData.organizationLogo);

        newData.organizationLogo = organizationLogo;
      }

      const response = await API.put("/admin/company", newData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUser({ ...user, ...response.data.data });

      setSuccess({ message: response.data.message });
    } catch (error) {
      console.log(error);
      setError({
        message: "Something went wrong",
      });

      if (newData?.organizationLogo) {
        const profilePhotoRef = ref(
          storage,
          `organizationLogo/${newData.organizationLogo.name}`
        );

        await deleteObject(profilePhotoRef);
        console.log("Uploaded logo removed from storage");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="mx-auto"
      error={error}
      setError={setError}
      handleSubmit={handleSubmit}
      setSuccess={setSuccess}
      success={success}
    >
      <div className="space-y-10">
        <Form.Input
          name="organizationName"
          type="text"
          value={newData.organizationName || formData.organizationName}
          onChange={handleChange}
        >
          Company Name
        </Form.Input>
        <Form.Input
          name="organizationBio"
          type="text"
          value={newData.organizationBio || formData.organizationBio}
          onChange={handleChange}
        >
          Company Bio
        </Form.Input>
        <Form.Input
          name="organizationLogo"
          type="file"
          accept="image/*"
          onChange={handleChange}
        >
          Company Logo
        </Form.Input>
        <img src={image || formData.organizationLogo} width={100} alt="" />
        <Button type="submit" as="button" disabled={!updated}>
          {loading && <Button.Spinner />} Update Company Info
        </Button>
      </div>
    </Form>
  );
};

export default Company;
