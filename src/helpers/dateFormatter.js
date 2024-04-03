const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const formattedDate = `${month} ${day}`;

  return formattedDate;
};

export default formatDate;
