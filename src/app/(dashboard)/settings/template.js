"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/Container";
import Text from "@/components/Text";
import { useUser } from "@/context/UserContext";

const Template = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
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
            <button type="button" className="text-red-600">
              Delete account
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default Template;
