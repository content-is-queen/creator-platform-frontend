"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { IoNotificationsOutline } from "react-icons/io5";

import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";

import Container from "@/components/Container";
import SubMenu from "@/components/SubMenu";

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const { userProfile, logout } = useUserProfile();

  const pathname = usePathname();

  const handleIsUserClicked = () => {
    setIsUserClicked((prev) => !prev);
  };

  const handleToggle = () => {
    setIsToggleClicked((prev) => !prev);
  };

  const handleSignOut = async () => {
    logout();
  };

  const PAGES = {
    creator: [
      {
        href: "/",
        label: "Dashboard",
      },
      { href: "/opportunities", label: "Opportunities" },
      { href: "/conversations", label: "Conversations" },
    ],
    client: [
      {
        href: "/",
        label: "Projects",
      },
      { href: "/conversations", label: "Conversations" },
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
            className={`${
              isToggleClicked ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col items-center py-2 leading-none border uppercase md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 ">
              {PAGES[userProfile?.role]?.map(({ href, label }) => (
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
                    alt="Kaleshe"
                  />
                </button>
              </li>
            </ul>
          </div>

          {isUserClicked && (
            <SubMenu
              heading={<SubMenu.Heading> {userProfile.email}</SubMenu.Heading>}
            >
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
