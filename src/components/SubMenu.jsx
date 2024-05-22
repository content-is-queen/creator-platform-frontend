const Item = ({ children }) => (
  <li className="font-medium hover:bg-gray-50 hover:text-queen-blue">
    {children}
  </li>
);

const Heading = ({ children }) => (
  <div className="px-4 py-3">
    <span className="block text-sm text-gray-500 truncate">{children}</span>
  </div>
);

const SubMenu = ({ heading, children }) => (
  <div className="z-50 text-sm list-none text-queen-black bg-white divide-y divide-gray-100 rounded-lg shadow-md absolute top-0 left-0">
    {heading && heading}
    <ul className="py-2" aria-labelledby="user-menu-button">
      {children}
    </ul>
  </div>
);

export default SubMenu;

SubMenu.Heading = Heading;

SubMenu.Item = Item;
