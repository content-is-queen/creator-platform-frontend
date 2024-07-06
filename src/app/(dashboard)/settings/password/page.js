"use client";

import { useState } from "react";

import useAuth from "@/hooks/useAuth";
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
  const { token } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
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
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        setSuccess({
          message: "Password update successfully",
        });
        return;
      } else {
        setError({
          message:
            response.message || "Something went wrong. User sign up failed.",
        });
      }
    } catch (error) {
      setError({
        message: error.message || "Something went wrong. User sign up failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input
          name="old_password"
          type={isOldPasswordVisible ? "text" : "password"}
          value={formData.old_password}
          onChange={handleChange}
          className="relative"
        >
          Old Password
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={handleToggleOldPasswordVisibility}
          >
            {isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Input>

        <Form.Input
          className="relative"
          name="password"
          type={isNewPasswordVisible ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
        >
          Password
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={handleToggleNewPasswordVisibility}
          >
            {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Input>

        <Button
          type="submit"
          as="button"
          variant="blue"
          onClick={handleSubmit}
          disabled={!updated}
        >
          {loading && <Button.Spinner />} Update Password
        </Button>
      </div>
      {error?.message && <Form.Error>{error.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default Password;
