import { Fragment, useState } from 'react';
import { Menu } from '@headlessui/react';

const Item = ({ children }) => (
  <Menu.Item>
    {({ active }) => (
      <li
        className={`font-medium hover:bg-gray-50 hover:text-queen-blue ${active ? 'bg-gray-50' : ''}`}
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
  <Menu>
    {({ open }) => (
      <Fragment>
        {heading && heading}
        <Menu.Items className="z-50 text-sm list-none text-queen-black bg-white divide-y divide-gray-100 rounded-lg shadow-md absolute top-14 right-0">
          {children}
        </Menu.Items>
      </Fragment>
    )}
  </Menu>
);

export default SubMenu;

SubMenu.Heading = Heading;
SubMenu.Item = Item;
