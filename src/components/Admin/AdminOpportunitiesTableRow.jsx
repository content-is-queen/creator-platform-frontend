import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Table from "../Table";

const AdminOpportunitiesRow = ({
  title,
  status,
  deadline,
  fullName,
  opportunityId,
  numberOfApplications,
  handleDelete,
}) => {
  return (
    <Table.Row>
      <Table.Data className="font-subheading font-bold whitespace-nowrap">
        <Link
          className="hover:underline"
          target="_blank"
          href={`/opportunities/${opportunityId}`}
        >
          {title}
        </Link>
      </Table.Data>
      <Table.Data>{status}</Table.Data>
      <Table.Data>{fullName}</Table.Data>
      <Table.Data>{deadline}</Table.Data>
      <Table.Data>{numberOfApplications}</Table.Data>
      <Table.Data>
        <button type="button" onClick={() => handleDelete(opportunityId)}>
          <span className="sr-only">Delete</span>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Table.Data>
    </Table.Row>
  );
};

export default AdminOpportunitiesRow;
