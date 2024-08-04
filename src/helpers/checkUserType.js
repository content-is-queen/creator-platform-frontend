const checkUserType = (role = "user") => {
  if (role === "creator" || role === "brand") {
    return "user";
  }

  return "admin";
};

export default checkUserType;
