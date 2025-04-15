"use client";

import { useState } from "react";

import API from "@/api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Password = () => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
  });

  const handleChange = (e) => {
    const checkIsEmpty = (str) => {
      return str.trim().length === 0;
    };

    const isEmpty =
      checkIsEmpty(formData.old_password) || checkIsEmpty(formData.password);

    setUpdated(!isEmpty);

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(
      (prevIsOldPasswordVisible) => !prevIsOldPasswordVisible
    );
  };

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(
      (prevIsNewPasswordVisible) => !prevIsNewPasswordVisible
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError({});
    setSuccess({});

    if (formData.old_password === formData.password) {
      setError({
        message: "You cannot use the same password as before",
      });
      return;
    }

    try {
      const response = await API.post(`/auth/password`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        setSuccess({
          message: "Password update successfully",
        });
        setUpdated(false);
      } else {
        setError({
          message: response.message,
        });
      }
    } catch (error) {
      setError({
        message: error.message,
      });
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
        <Form.Input
          name="old_password"
          type={isOldPasswordVisible ? "text" : "password"}
          value={formData.old_password}
          onChange={handleChange}
          className="relative"
        >
          Old Password
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={handleToggleOldPasswordVisibility}
          >
            {isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </Form.Input>

        <Form.Input
          className="relative"
          name="password"
          type={isNewPasswordVisible ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
        >
          Password
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={handleToggleNewPasswordVisibility}
          >
            {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </Form.Input>

        <Button type="submit" as="button" variant="blue" disabled={!updated}>
          {loading && <Button.Spinner />} Update Password
        </Button>
      </div>
    </Form>
  );
};

export default Password;
