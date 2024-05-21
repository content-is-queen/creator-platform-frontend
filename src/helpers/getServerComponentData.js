// named functions used for retrieving data for server components

import API from "@/api/api";

export const getOpportunitiesByUserId = async (uid) => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development" || !uid) {
    return [];
  }

  try {
    const { data } = await API.get(`/opportunities/id/${uid}`);
    return data.filter((i) => i.status != "archived");
  } catch (e) {
    console.error(e);
  }
};

export const getOpportunityById = async (id) => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development" || !id) {
    return [];
  }

  try {
    const { data } = await API.get(`/opportunities/opportunityid/${id}`);
    return data;
  } catch (error) {
    throw new Error("Something went wrong when getting the opportunity");
  }
};

export const getOpportunities = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const { data } = await API.get("/opportunities");
    return data.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
};
