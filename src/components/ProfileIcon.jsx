import { twMerge } from "tailwind-merge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileIcon = ({
  profilePhoto,
  children,
  className,
  as = "div",
  ...otherProps
}) => {
  const Element = as;
  return (
    <Element
      className={twMerge(
        "h-8 w-8 bg-queen-black rounded-full overflow-hidden flex justify-center shrink-0 items-center",
        className
      )}
      {...otherProps}
    >
      {profilePhoto ? (
        <img
          className="w-full h-full object-top object-cover"
          height={20}
          width={20}
          src={profilePhoto}
          alt=""
        />
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
