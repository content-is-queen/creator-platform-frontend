"use client";

import { useState } from "react";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Password = () => {
  const { token } = useToken();
  const [errors, setError] = useState({});
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUpdated(true);
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
    setLoading(true);
    setError({});
    setSuccess({});

    if (formData.old_password === formData.password) {
      setError({
        message: "You cannot use the same password as before",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/auth/password", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        setSuccess({
          message: "Password updated successfully",
        });
      } else {
        setError({
          message:
            response.message || "Something went wrong. Password update failed.",
        });
      }
    } catch (error) {
      setError({
        message:
          error.message || "Something went wrong. Password update failed.",
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
          onClick={handleSubmit}
          disabled={!updated}
        >
          {loading && <Button.Spinner />} Update Password
        </Button>
      </div>
      {errors?.message && <Form.Error>{errors.message}</Form.Error>}
      {success?.message && <Form.Success>{success.message}</Form.Success>}
    </Form>
  );
};

export default Password;
