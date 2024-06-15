"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { auth, messaging } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { getMessaging, onMessage } from "firebase/messaging";
import { Menu } from "@headlessui/react";

import ProfileIcon from "@/components/ProfileIcon";
import Container from "@/components/Container";
import Button from "@/components/Button";
import NotificationsList from "./NotificationsList";
import useToken from "@/hooks/useToken";
import API from "@/api/api";

const MainNav = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [notificationList, setNotificationsList] = useState([]);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const { token } = useToken();
  const { user, setUser, loading } = useUser();

  const pathname = usePathname();

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
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
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    }
    setIsBellClicked((prev) => !prev);
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
      !loading &&
      !user &&
      (pathname !== "/signup" || pathname !== "/login")
    ) {
      router.push("/login");
    }
  }, [loading]);

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

  useEffect(() => {
    console.log(messaging, "Messaging");
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      setIsNewNotification(true);
      if (payload.notification) {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon,
        });
      }
    });
  }, []);

  return (
    <nav
      className={clsx(
        "bg-queen-blue text-queen-yellow py-4",
        isMenuOpen && "fixed w-full h-screen z-10"
      )}
    >
      <Container className="flex flex-wrap items-center justify-between text-sm w-full">
        <Link
          href="/"
          className="flex items-center gap-x-3 rtl:space-x-reverse"
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
        <div className="flex items-center md:order-2 space-x-3 md:space-x-auto rtl:space-x-reverse">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul
              className={clsx(
                "flex flex-col items-center py-2 leading-none uppercase md:space-x-6 rtl:space-x-reverse md:flex-row md:border-0",
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
                      "relative md:after:absolute md:after:h-[1px] md:after:w-0 md:after:bg-queen-yellow md:after:left-0 md:after:-bottom-1 md:hover:after:w-full transition-all",
                      pathname === href && "after:w-full"
                    )
                  )}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              {user && !user?.subscribed && (
                <li>
                  <Button variant="yellow" href="/plus">
                    Upgrade account
                  </Button>
                </li>
              )}

              <li>
                <button
                  type="button"
                  className="flex text-sm rounded-full md:me-0 focus:ring-4"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={handleIsBellClicked}
                >
                  <span className="uppercase md:sr-only">Notifications</span>
                  {isNewNotification ? (
                    <MdOutlineNotificationAdd className="w-6 h-6" />
                  ) : (
                    <IoNotificationsOutline className="w-6 h-6" />
                  )}
                </button>
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
          <div className="order-2 flex items-center gap-x-2 flex-row-reverse md:flex-row md:mr-2">
            <Menu as="div" className="relative">
              <Menu.Button>
                <ProfileIcon
                  className="shrink-0 md:me-0 focus:ring-4 focus:ring-gray-300 h-8 w-8 order-1"
                  profilePhoto={user?.profilePhoto}
                >
                  <span className="sr-only">User menu</span>
                </ProfileIcon>
              </Menu.Button>
              <Menu.Items className="absolute z-50 right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                <Menu.Item as="div" className="text-queen-black/60">
                  <div className="px-4 py-2 text-sm">{user?.email}</div>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-queen-yellow rounded-lg md:hidden hover:bg-queen-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
