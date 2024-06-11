import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

const Toast = ({ children }) => {
  return (
    <Card
      id="toast-danger"
      className="fixed top-6 right-6 flex w-full max-w-64 items-start"
      role="alert"
      small
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{children}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </Card>
  );
};

export default Toast;
