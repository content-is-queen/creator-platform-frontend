"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSubscribed from "@/hooks/useSubscribed";
import { useUser } from "@/context/UserContext";

const SettingsSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { subscribed } = useSubscribed();

  const isAdmin = /^(admin|super_admin)$/i.test(user.role);

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
    ...(user && subscribed && !isAdmin
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
    <ul>
      {LINKS.map(({ href, label }) => (
        <li key={href} className="py-0.5">
          <Link
            href={href}
            className={pathname === href ? undefined : "opacity-70"}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SettingsSidebar;
