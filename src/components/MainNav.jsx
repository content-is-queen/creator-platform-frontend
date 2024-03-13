"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import isAuth from "@/helpers/isAuth";
import API from "@/api/api";
import { doSignOut } from "@/firebase/auth";
import Secure from "@/utils/SecureLs";

import { IoNotificationsOutline } from "react-icons/io5";

import Container from "@/components/Container";

const PAGES = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/conversations", label: "Conversations" },
];

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleIsUserClicked = () => {
    setIsUserClicked((prev) => !prev);
  };

  const handleToggle = () => {
    setIsToggleClicked((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      Secure.removeToken();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("auth/profile");
      setUserProfile(response.data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const { email } = isAuth();
  useEffect(() => {
    if (!email) {
      window.location.href = "/login";
    }
    fetchUserProfile();
  }, []);
  const pathname = usePathname();

  return (
    <nav className="bg-queen-blue text-queen-yellow border-gray-200 py-4">
      <Container className="flex flex-wrap items-center justify-between text-sm w-full">
        <Link
          href="/dashboard"
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
            className={`${
              isToggleClicked ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col items-center py-2 leading-none border uppercase md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 ">
              {PAGES.map(({ href, label }) => (
                <li
                  key={href}
                  className={clsx(
                    pathname === href &&
                      "relative after:absolute after:h-0.5 after:w-full after:bg-queen-yellow after:left-0 after:-bottom-1.5"
                  )}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              <li className="text-queen-yellow flex items-center">
                <button
                  type="button"
                  onClick={handleIsUserClicked}
                  className="flex text-sm  rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <IoNotificationsOutline className="w-6 h-6" />
                </button>
              </li>
              <li className="flex items-center justify-start">
                <button
                  type="button"
                  onClick={handleIsUserClicked}
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/keshe.jpg"
                  />
                </button>
              </li>
            </ul>
          </div>

          {isUserClicked && (
            <div
              className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-16 right-8"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {userProfile?.podcast_name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    href="/profile"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-4 pb-4"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline m-4 pt-4"
                  >
                    Current user info
                  </Link>
                </li>

                <li>
                  <button
                    className="font-medium text-blue-600 m-4"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
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
