import { Menu } from "@headlessui/react";

const Item = ({ children }) => (
  <Menu.Item>
    {({ active }) => (
      <li
        className={`font-medium ${active ? "bg-gray-50 text-queen-blue" : ""}`}
      >
        {children}
      </li>
    )}
  </Menu.Item>
);

const Heading = ({ children }) => (
  <div className="px-4 py-3">
    <span className="block text-sm text-gray-500 truncate">{children}</span>
  </div>
);

const SubMenu = ({ heading, children }) => (
  <Menu
    as="div"
    className="z-50 text-sm list-none text-queen-black capitalize bg-white divide-y divide-gray-100 rounded-lg shadow-md absolute top-14 right-0"
  >
    {heading && heading}
    <ul className="py-2" aria-labelledby="user-menu-button">
      {children}
    </ul>
  </Menu>
);

export default SubMenu;

SubMenu.Heading = Heading;
SubMenu.Item = Item;
