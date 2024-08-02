"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";

import ProfileIcon from "@/components/ProfileIcon";
import Container from "@/components/Container";
import Button from "@/components/Button";

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { user, setUser, loading } = useUser();

  const admin = user?.role === "super_admin" || user?.role === "admin";
  const { subscribed } = useAuth();

  const pathname = usePathname();

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      auth.signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    if (
      !loading &&
      !user &&
      (pathname !== "/signup" || pathname !== "/login")
    ) {
      router.push("/login");
    }
  }, [loading]);

  console.log(pathname);

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
      { href: "/conversations", label: "Conversations" },
    ],
    super_admin: [
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
      { href: "/conversations", label: "Conversations" },
    ],
  };

  return (
    <nav
      className={clsx(
        "bg-queen-blue text-queen-yellow py-4",
        isMenuOpen && "fixed w-full h-screen z-10"
      )}
    >
      <Container className="flex flex-wrap items-center justify-between w-full">
        <Link
          href="/"
          className="flex items-center gap-x-3 rtl:space-x-reverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-queen-orange"
        >
          <img
            src="/images/CiQ_Logo_Horizontal.svg"
            className="h-12 hidden md:block"
            alt="Content is queen"
          />
          <img
            src="/images/CiQ_Logo_Stacked.svg"
            width={100}
            className="md:hidden"
            alt="Content is queen"
          />
        </Link>
        <div className="flex items-center lg:order-2 space-x-3 lg:space-x-6 rtl:space-x-reverse">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-user"
          >
            <ul
              className={clsx(
                "flex flex-col items-center py-2 leading-none tracking-wide uppercase lg:space-x-5 rtl:space-x-reverse lg:flex-row lg:border-0",
                isMenuOpen &&
                  "fixed w-full left-0 top-20 z-10 space-y-6 bg-queen-blue pt-16 pb-20"
              )}
            >
              {LINKS[user?.role]?.map(({ href, label }) => (
                <li
                  key={href}
                  className={clsx(
                    twMerge(
                      pathname !== href && "opacity-100",
                      "relative lg:after:absolute lg:after:h-[1px] lg:after:w-0 lg:after:bg-queen-yellow-light lg:after:left-0 lg:after:-bottom-1 lg:hover:after:w-full transition-all",
                      pathname === href &&
                        "lg:after:w-full lg:after:bg-queen-yellow"
                    )
                  )}
                >
                  <Link
                    href={href}
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-queen-orange"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {user && !subscribed && (
                <li>
                  <Button variant="yellow" href="/plus">
                    Upgrade to {user.role} +
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <div className="order-2 flex items-center gap-x-2 flex-row-reverse lg:flex-row lg:mr-2">
            <Menu as="div" className="relative z-10">
              <MenuButton className="align-middle focus-visible:ring-4 focus-visible:ring-queen-yellow focus-visible:rounded-full">
                <ProfileIcon
                  className="shrink-0 lg:me-0 h-8 w-8 order-1"
                  profilePhoto={user?.profilePhoto}
                >
                  <span className="sr-only">User menu</span>
                </ProfileIcon>
              </MenuButton>
              <MenuItems
                className="absolute transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-t-md rounded-b-md shadow-lg focus-visible:outline-none"
                transition
              >
                <MenuItem as="div" className="text-queen-black/60">
                  <div className="px-4 py-2 text-sm">{user?.email}</div>
                </MenuItem>
                {!admin && (
                  <MenuItem>
                    <Link
                      href="/profile"
                      className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 text-queen-black group flex rounded-b-md items-center w-full px-5 py-2 text-sm"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link
                    href="/settings"
                    className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 text-queen-black group flex rounded-b-md items-center w-full px-5 py-2 text-sm"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleSignOut}
                    className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 text-queen-black group flex rounded-b-md items-center w-full px-5 py-2 text-sm"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-queen-yellow rounded-lg lg:hidden hover:bg-queen-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-600"
              onClick={handleToggle}
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="#E5FC52"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
