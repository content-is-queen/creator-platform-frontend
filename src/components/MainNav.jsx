"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import { IoNotificationsOutline } from "react-icons/io5";

import ProfileIcon from "@/components/ProfileIcon";
import Container from "@/components/Container";
import SubMenu from "@/components/SubMenu";
import Button from "@/components/Button";
import CreateUserForm from "./Admin/CreateUserForm";

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const router = useRouter();

  const { user, userLoaded, setUser } = useUser();

  const standard = true;

  const pathname = usePathname();

  const handleIsUserClicked = () => {
    if (!user) return;
    setIsUserClicked((prev) => !prev);
  };

  const handleToggle = () => {
    setIsToggleClicked((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      auth.signOut();
      setUser(null);
      localStorage.removeItem("userProfile");
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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
            className="h-12"
            alt="Content is queen"
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className={`${
              isToggleClicked ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col items-center py-2 leading-none border uppercase md:space-x-6 rtl:space-x-reverse md:flex-row md:border-0">
              {LINKS[user?.role]?.map(({ href, label }) => (
                <li
                  key={href}
                  className={clsx(
                    twMerge(
                      pathname !== href && "opacity-80",
                      "relative after:absolute after:h-[1px] after:w-0 after:bg-queen-yellow after:left-0 after:-bottom-1 hover:after:w-full transition-all",
                      pathname === href && "after:w-full"
                    )
                  )}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              {standard && user && user?.role !== "admin" && (
                <li>
                  <Button variant="yellow" href="/plus">
                    Upgrade to plus
                  </Button>
                </li>
              )}

              <li>
                <button
                  type="button"
                  onClick={handleIsUserClicked}
                  className="flex text-sm rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <IoNotificationsOutline className="w-6 h-6" />
                </button>
              </li>
              <li>
                <ProfileIcon
                  className="md:me-0 focus:ring-4 focus:ring-gray-300 h-8 w-8"
                  type="button"
                  as="button"
                  onClick={handleIsUserClicked}
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  imageUrl={user?.imageUrl}
                >
                  <span className="sr-only">Open user menu</span>
                </ProfileIcon>
              </li>
            </ul>
          </div>

          {isUserClicked && (
            <SubMenu heading={<SubMenu.Heading>{user?.email}</SubMenu.Heading>}>
              <SubMenu.Item>
                <Link
                  href="/profile"
                  className="px-4 py-1 w-full text-left inline-block"
                >
                  Profile
                </Link>
              </SubMenu.Item>

              <SubMenu.Item>
                <Link
                  href="/settings"
                  className="px-4 py-1 w-full text-left inline-block"
                >
                  Settings
                </Link>
              </SubMenu.Item>

              <SubMenu.Item>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-1 w-full text-left inline-block"
                >
                  Logout
                </button>
              </SubMenu.Item>
            </SubMenu>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-queen-yellow rounded-lg md:hidden hover:bg-queen-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleToggle}
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
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
      </Container>
    </nav>
  );
};

export default MainNav;
