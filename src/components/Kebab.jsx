import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Kebab = ({ ...otherProps }) => (
  <button type="button" className="ml-auto pl-2" {...otherProps}>
    <FontAwesomeIcon icon={faEllipsisV} />
  </button>
);

export default Kebab;
