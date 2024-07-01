"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";

import Container from "@/components/Container";
import Subheading from "@/components/Subheading";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const { subscribed } = useAuth();

  const DEFAULT_LINKS = [
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
  ];

  const LINKS = {
    creator: [
      ...DEFAULT_LINKS,
      ...(user && subscribed
        ? [
            {
              href: "/settings/subscription",
              label: "Subscription",
            },
          ]
        : []),
    ],
    brand: [
      ...DEFAULT_LINKS,
      ...(user && subscribed
        ? [
            {
              href: "/settings/subscription",
              label: "Subscription",
            },
          ]
        : []),
    ],
    admin: [...DEFAULT_LINKS],
    super_admin: [
      ...DEFAULT_LINKS,
      {
        href: "/settings/company",
        label: "Edit Company Info",
      },
    ],
  };

  return (
    <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="w-full max-w-40">
            <div className="border-b border-queen-black/20 pb-4 mb-4">
              <Subheading size="lg" className="mb-2">
                Settings
              </Subheading>
              <ul>
                {LINKS[user?.role]?.map(({ href, label }) => (
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

export default Layout;
