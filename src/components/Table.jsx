import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Spinner from "@/components/Spinner";

const Row = ({ children }) => (
  <tr className="hover:bg-queen-blue/10">{children}</tr>
);

const Data = ({ children, className, ...otherProps }) => (
  <td className={twMerge(clsx("px-4 py-4", className))} {...otherProps}>
    {children}
  </td>
);

const Head = ({ children }) => (
  <thead className="text-queen-black/50 capitalise font-subheading border-b border-b-queen-black/25">
    {children}
  </thead>
);

const Body = ({ children }) => <tbody>{children}</tbody>;

const Table = ({ children }) => (
  <div className="relative overflow-x-auto h-72">
    <table className="w-full text-sm text-left text-queen-black/80">
      {children}
    </table>
  </div>
);

const Loading = () => (
  <Table.Row>
    <Table.Data colSpan="7" className="text-center py-20">
      <div className="flex items-center justify-center">
        <Spinner className="h-6 w-6" />
      </div>
    </Table.Data>
  </Table.Row>
);

export default Table;

Table.Row = Row;

Table.Head = Head;

Table.Data = Data;

Table.Body = Body;

Table.Loading = Loading;
