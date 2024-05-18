// named functions used for retrieving data for server components

import API from "@/api/api";

export const getOpportunitiesByUserId = async (uid) => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development" || !uid) {
    return [];
  }

  try {
    const res = await API(`/opportunities/id/${uid}`);
    return res.filter((i) => i.status != "archived");
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
    const res = await API(`/opportunities/opportunityid/${id}`);
    return res;
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
    const res = await API("/opportunities");
    return res.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
};
