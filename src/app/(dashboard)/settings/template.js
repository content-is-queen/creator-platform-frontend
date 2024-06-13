"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import Text from "@/components/Text";
import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const Template = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { token } = useToken();

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

  const handleDeleteAccount = async () => {
    if (fullName !== user.fullName) {
      setError("Full name does not match. Please try again.");
      return;
    }

    try {
      await API.post("/delete-account", { token });
      // Handle account deletion success (e.g., log out the user, redirect, etc.)
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError("An error occurred. Please try again.");
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
              onClick={() => setShowDeleteModal(true)}
            >
              Delete account
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="mb-4">
              Please type your full name to confirm you want to delete your
              account. This action cannot be undone.
            </p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-200 p-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-600 text-white p-2 rounded"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Template;
