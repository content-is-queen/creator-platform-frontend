"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import API from "@/api/api";

import Modal from "@/components/Modal";
import Subheading from "@/components/Subheading";
import Form from "@/components/Form";
import Button from "@/components/Button";

const DeleteAccountModal = () => {
  const handleDeleteAccount = async () => {
    setLoading(true);
    setError({});
    setSuccess({});
    try {
      const response = await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        data: {
          email,
        },
      });

      if (response.status === 200) {
        setSuccess({
          message: "Account deleted successfully",
        });
        router.push("/login");
      } else {
        setError({
          message: response.data.message || "Failed to delete account",
        });
      }
    } catch (error) {
      setError({
        message:
          error.response?.data.message ||
          error?.message ||
          "Failed to delete account. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="text-red-600"
        onClick={() => setIsOpen(true)}
      >
        Delete account
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="min-h-64 max-w-2xl"
      >
        <Subheading size="lg">Confirm account deletion</Subheading>

        <Form handleSubmit={handleDeleteAccount} setError={setError}>
          <div className="space-y-6">
            <p className="mb-4">
              Please type your email to confirm account deletion. This action
              cannot be undone.
            </p>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded px-3 py-1 w-full mt-1"
              required
            />
            <Button
              as="button"
              type="submit"
              className="mt-8"
              disabled={!email.trim()}
            >
              {loading && <Button.Spinner />} Confirm
            </Button>
          </div>
          {error?.message && <Form.Error>{error.message}</Form.Error>}
          {success?.message && <Form.Success>{success.message}</Form.Success>}
        </Form>
      </Modal>
    </>
  );
};

export default DeleteAccountModal;
