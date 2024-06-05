import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/firebase.config";
import ProfileIcon from "./ProfileIcon";
import SubMenu from "./SubMenu";
import { useUser } from "@/context/UserContext";

const MainNavDropdown = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleIsUserClicked = () => {
    if (!user) return;
    setIsUserClicked((prev) => !prev);
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

  return (
    <>
      <ProfileIcon
        className="md:me-0 focus:ring-4 focus:ring-gray-300 h-8 w-8"
        type="button"
        as="button"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        imageUrl={user?.imageUrl}
      >
        <span className="sr-only">User</span>
      </ProfileIcon>
      <SubMenu>
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
    </>
  );
};

export default MainNavDropdown;
