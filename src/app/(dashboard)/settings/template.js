"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import Text from "@/components/Text";
import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import useToken from "@/hooks/useToken";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Error, Success } from "@/components/Form";


const Template = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [fullName, setFullName] = useState("");
  const [errors, setError] = useState({});
  const { token } = useToken();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("User's input name:", fullName);

  const LINKS = [
    {
      href: "/settings",
      label: "General",
    },
    {
      href: "/settings/edit-profile",
      label: "Edit Profile",
    },
    {
      href: "/settings/password",
      label: "Password",
    },
    ...(user && user.role !== "admin" && user.role !== "super_admin"
      ? [
          {
            href: "/settings/subscription",
            label: "Subscription",
          },
        ]
      : []),
    ...(user && user.role === "super_admin"
      ? [
          {
            href: "/settings/company",
            label: "Edit Company Info",
          },
        ]
      : []),
  ];

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (fullName !== user.fullName) {
      setError("Full name does not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      await API.post("/delete-account", { token });
      // Handle account deletion success (e.g., log out the user, redirect, etc.)
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="w-full max-w-40">
            <div className="border-b border-queen-black/20 pb-4 mb-4">
              <Text size="lg" className="font-subheading font-bold mb-2">
                Settings
              </Text>
              <ul>
                {LINKS.map(({ href, label }) => (
                  <li key={href} className="py-1">
                    <Link
                      href={href}
                      className={pathname === href ? undefined : "opacity-70"}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="text-red-600"
              onClick={() => setIsOpen(true)}
            >
              Delete account
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Account Deletion"
        size="2xl"
      >
        <form onSubmit={handleDeleteAccount} className="mt-10">
        <div className="space-y-6">
          <p className="mb-4">
            Please type your full name to confirm you want to delete your account. This action cannot be undone.
          </p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        {errors?.message && <Error>{errors.message}</Error>}
        </div>
            <Button as="button" type="submit" className="mt-8">
              {loading && <Button.Spinner />}
              Confirm
            </Button>
        </form>
      </Modal>
    </Container>
  );
};

export default Template;
