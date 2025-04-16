import { MenuItems } from "@headlessui/react";

const MainNavSubMenu = ({ children }) => (
  <MenuItems
    className="absolute transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-t-md rounded-b-md shadow-lg focus-visible:outline-none"
    transition
  >
    {children}
  </MenuItems>
);

export default MainNavSubMenu;
