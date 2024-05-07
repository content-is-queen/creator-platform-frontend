import config from "../config";

const API = async (endpoint, options) =>
  await fetch(`${config.DEFAULT_API}${endpoint}`, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export default API;
