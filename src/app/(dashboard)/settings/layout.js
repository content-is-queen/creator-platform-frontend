"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import API from "@/api/api";

import Container from "@/components/Container";
import Subheading from "@/components/Subheading";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Form from "@/components/Form";

const Layout = ({ children }) => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const pathname = usePathname();
  const { user } = useUser();
  const { token } = useAuth();
  const router = useRouter();
  const { subscribed } = useAuth();

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
    ...(user && subscribed
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
    setLoading(true);
    setError({});
    setSuccess({});
    try {
      const response = await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="bg-queen-white">
      <Container size="4xl">
        <div className="py-12 md:py-20">
          <div className="flex gap-12">
            <div className="w-full max-w-40">
              <div className="border-b border-queen-black/20 pb-4 mb-4">
                <Subheading size="lg" className="mb-2">
                  Settings
                </Subheading>
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
      </Container>
    </div>
  );
};

export default Layout;
