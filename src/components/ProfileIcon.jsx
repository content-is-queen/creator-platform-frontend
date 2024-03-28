import { twMerge } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileIcon = ({
  photoUrl,
  children,
  className,
  as = "div",
  ...otherProps
}) => {
  const Element = as;
  return (
    <Element
      className={twMerge(
        "h-8 w-8 bg-queen-black rounded-full overflow-hidden flex justify-center items-center",
        className,
      )}
      {...otherProps}
    >
      {photoUrl ? (
        <img className="w-full h-full object-cover" src={photoUrl} alt="" />
      ) : (
        <FontAwesomeIcon
          className="text-queen-white w-3/6 h-3/6"
          icon={faUser}
        />
      )}
      {children}
    </Element>
  );
};

export default ProfileIcon;
