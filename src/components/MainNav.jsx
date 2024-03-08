"use client";

import { useState } from "react";
import Link from "next/link";

import { IoNotificationsOutline } from "react-icons/io5";

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const handleIsUserClicked = () => {
    setIsUserClicked((prev) => !prev);
  };

  const handleToggle = () => {
    setIsToggleClicked((prev) => !prev);
  };
  return (
    <nav className="bg-queen-blue border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="" className="h-16" alt="Content is queen" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className={`${
              isToggleClicked ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <Link
                href="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gray-500 border-b-4 border-queen-yellow pb-1"
                      : "text-gray-500"
                  } flex items-center p-2 text-queen-yellow uppercase hover:border-b-4 border-queen-yellow`
                }
              >
                dashboard
              </Link>
              <li>
                <Link
                  href="/opportunities"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-gray-500 border-b-4 border-queen-yellow pb-1"
                        : "text-gray-500"
                    } flex items-center p-2 text-queen-yellow uppercase hover:border-b-4 border-queen-yellow`
                  }
                >
                  opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/conversations"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-gray-500 border-b-4 border-queen-yellow pb-1"
                        : "text-gray-500"
                    } flex items-center p-2 text-queen-yellow uppercase hover:border-b-4 border-queen-yellow`
                  }
                >
                  conversations
                </Link>
              </li>
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
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="use"
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
                  Bonnie Green
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Current user info
                  </Link>
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
      </div>
    </nav>
  );
};

export default MainNav;
