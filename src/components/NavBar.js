import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import isAuth from "../helpers/isAuth";

import Secure from "../utils/SecureLs";

const NavBar = () => {
  const navigate = useNavigate();
  const user = isAuth();
  const startAuth = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Secure.removeToken();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white dark:bg-slate-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center">
          <p className="h-8 mr-3 text-blue transform scale-150 dark:text-gray-300">
            Task manager
          </p>
        </NavLink>
        <div className="flex md:order-2">
          {!user && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800 dark:text-gray-300"
              onClick={startAuth}
            >
              Login
            </button>
          )}
          {user && (
            <div className="flex items-center md:order-2">
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
