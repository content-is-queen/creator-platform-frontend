"use client";

import clsx from "clsx";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth, messaging } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineNotificationAdd } from "react-icons/md";

import ProfileIcon from "@/components/ProfileIcon";
import Container from "@/components/Container";
import SubMenu from "@/components/SubMenu";
import Button from "./Button";
import CreateUserForm from "./Admin/CreateUserForm";
import API from "@/api/api";
import useToken from "@/hooks/useToken";
import NotificationsList from "./NotificationsList";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [notificationList, setNotificationsList] = useState([]);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const { token } = useToken();

  const router = useRouter();

  const { user, userLoaded, setUser } = useUser();

  const pathname = usePathname();

  const handleIsUserClicked = () => {
    if (!user) return;
    setIsUserClicked((prev) => !prev);
  };
  const handleClearAll = async () => {
    try {
      await API("/notifications/clear", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsBellClicked(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const handleIsBellClicked = async () => {
    setIsNewNotification(false);
    if (!user) return;
    if (isBellClicked === false) {
      if (token) {
        try {
          const response = await API("/notifications/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = response.data;
          setNotificationsList(data);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setNotifications(response);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    }
    setIsBellClicked((prev) => !prev);
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
  useEffect(() => {
    onMessage(messaging, async (payload) => {
      setIsNewNotification(true);
      toast(payload?.notification?.title);
    });
  }, []);
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
                  onClick={handleIsBellClicked}
                  className="flex text-sm  rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  {isNewNotification ? (
                    <MdOutlineNotificationAdd className="w-6 h-6" />
                  ) : (
                    <IoNotificationsOutline className="w-6 h-6" />
                  )}
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
          {isBellClicked && (
            <div>
              <div
                id="dropdownNotification"
                class="z-2000 w-full absolute max-w-sm max-h-md bg-white divide-y divide-gray-100 rounded-lg shadow"
                aria-labelledby="dropdownNotificationButton"
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  zIndex: "20000",
                }}
              >
                <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
                  Notifications
                </div>
                {notificationList?.length > 0 &&
                  notificationList?.map((item) => {
                    console.log();
                    return <NotificationsList key={item.id} data={item} />;
                  })}
                {notificationList.length === 0 && (
                  <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
                    Your notification inbox is empty.
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleClearAll}
                  class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 w-full"
                >
                  <div class="inline-flex items-center ">Clear all</div>
                </button>
              </div>
            </div>
          )}

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
