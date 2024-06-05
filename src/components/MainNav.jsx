"use client";

import clsx from "clsx";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/context/UserContext";
import { IoNotificationsOutline } from "react-icons/io5";

import Container from "@/components/Container";
import CreateUserForm from "./Admin/CreateUserForm";
import MainNavDropdown from "./MainNavDropdown";

const MainNav = () => {
  const router = useRouter();

  const { user, userLoaded } = useUser();

  const pathname = usePathname();

  useEffect(() => {
    if (
      userLoaded &&
      !user &&
      (pathname !== "/signup" || pathname !== "/login")
    ) {
      router.push("/login");
    }
  }, [userLoaded]);

  const LINKS = {
    creator: [
      {
        href: "/",
        label: "Dashboard",
      },
      { href: "/opportunities", label: "Opportunities" },
      { href: "/conversations", label: "Conversations" },
    ],
    brand: [
      {
        href: "/",
        label: "Projects",
      },
      { href: "/conversations", label: "Conversations" },
    ],
    admin: [
      {
        href: "/",
        label: "Dashboard",
      },
      {
        href: "/admin/opportunities",
        label: "Opportunities",
      },
      {
        href: "/admin/users",
        label: "Users",
      },
    ],
  };

  return (
    <nav className="bg-queen-blue text-queen-yellow border-gray-200 py-4">
      <Container className="flex flex-wrap items-center justify-between text-sm w-full">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/images/CiQ_Logo_Horizontal.svg"
            className="h-10"
            alt="Content is queen"
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col items-center py-2 leading-none border uppercase md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0">
              {LINKS[user?.role]?.map(({ href, label }) => (
                <li
                  key={href}
                  className={clsx(
                    pathname !== href && "opacity-80",
                    pathname === href &&
                      "relative after:absolute after:h-[1px] after:w-full after:bg-queen-yellow after:left-0 after:-bottom-1"
                  )}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              {user?.role === "admin" && (
                <li>
                  <CreateUserForm />
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="flex text-sm  rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Notifications</span>
                  <IoNotificationsOutline className="w-6 h-6" />
                </button>
              </li>
              <li>
                <MainNavDropdown />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
